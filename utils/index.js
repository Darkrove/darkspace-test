export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const shortenAddress = (address) => {
  return `${address.slice(0, 7)}...${address.slice(address.length - 5)}`;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};


export const formatDate = (epoch) => {
  const myDate = new Date(epoch * 1000);
  let dateStr = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
  return dateStr.toString()
}


// Thumbnail
// convert image to object part instead of base64 for better performance
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
export const importFileandPreview = (file, revoke) => {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL;
    let preview = window.URL.createObjectURL(file);
    // remove reference
    if (revoke) {
      window.URL.revokeObjectURL(preview);
    }
    setTimeout(() => {
      resolve(preview);
    }, 100);
  });
}


/**
*
* @param videoFile {FIle} // the video file
* @param numberOfThumbnails {number} //number of thumbnails you want to generate
* @returns {string[]} // an array of base64 thumbnails images
*
* @abstract
* Idea taken from - https://codepen.io/aertmann/pen/mrVaPx
* The original functionality of getVideoThumbnail() function is customized as per working code
* If it didn't work in future then replace it with about links working example
*/
export const generateVideoThumbnails = async (videoFile, numberOfThumbnails) => {

  let thumbnail = [];
  let fractions = [];
  return new Promise(async (resolve, reject) => {
    if (!videoFile.type?.includes("video")) reject("not a valid video file");
    await getVideoDuration(videoFile).then(async (duration) => {
      // divide the video timing into particular timestamps in respective to number of thumbnails
      // ex if time is 10 and numOfthumbnails is 4 then result will be -> 0, 2.5, 5, 7.5 ,10
      // we will use this timestamp to take snapshots
      for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
        fractions.push(Math.floor(i));
      }
      // the array of promises
      let promiseArray = fractions.map((time) => {
        return getVideoThumbnail(videoFile, time)
      })
      // console.log('promiseArray', promiseArray)
      // console.log('duration', duration)
      // console.log('fractions', fractions)
      await Promise.all(promiseArray).then((res) => {
        res.forEach((res) => {
          // console.log('res', res.slice(0,8))
          thumbnail.push(res);
        });
        // console.log('thumbnail', thumbnail)
        resolve(thumbnail);
      }).catch((err) => {
        console.error(err)
      }).finally((res) => {
        console.log(res);
        resolve(thumbnail);
      })
    });
    reject("something went wront");
  });
};

const getVideoThumbnail = (file, videoTimeInSeconds) => {
  return new Promise((resolve, reject) => {
    if (file.type.match("video")) {
      importFileandPreview(file).then((urlOfFIle) => {
        var video = document.createElement("video");
        var timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
            video.pause();
          }
        };
        video.addEventListener("loadeddata", function () {
          if (snapImage()) {
            video.removeEventListener("timeupdate", timeupdate);
          }
        });
        var snapImage = function () {
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL();
          var success = image.length > 100000;
          if (success) {
            URL.revokeObjectURL(urlOfFIle);
            resolve(image);
          }
          return success;
        };
        video.addEventListener("timeupdate", timeupdate);
        video.preload = "metadata";
        video.src = urlOfFIle;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.currentTime = videoTimeInSeconds;
        video.play();
      });
    } else {
      reject("file not valid");
    }
  });
};

/**
*
* @param videoFile {File}
* @returns {number} the duration of video in seconds
*/
export const getVideoDuration = (videoFile) => {
  return new Promise((resolve, reject) => {
    if (videoFile) {
      if (videoFile.type.match("video")) {
        importFileandPreview(videoFile).then((url) => {
          let video = document.createElement("video");
          video.addEventListener("loadeddata", function () {
            resolve(video.duration);
          });
          video.preload = "metadata";
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
          //  window.URL.revokeObjectURL(url);
        });
      }
    } else {
      reject(0);
    }
  });
};