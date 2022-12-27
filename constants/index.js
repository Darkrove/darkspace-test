import { upload, dashboard, folder, profile, image, video, clock } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    tip: 'Home',
    imgUrl: dashboard,
    link: '/dashboard',
  },
  {
    name: 'uploadmedia',
    tip: 'Upload',
    imgUrl: upload,
    link: '/dashboard/uploadmedia',
  },
  {
    name: 'files',
    tip: 'Files',
    imgUrl: folder,
    link: '/dashboard/files',
  },
  {
    name: 'videos',
    tip: 'Videos',
    imgUrl: video,
    link: '/dashboard/videos',
  },
  {
    name: 'photos',
    tip: 'Photos',
    imgUrl: image,
    link: '/dashboard/photos',
  },
  {
    name: 'recent',
    tip: 'Recent',
    imgUrl: clock,
    link: '/dashboard/recent',
  },
  {
    name: 'profile',
    tip: 'Profile',
    imgUrl: profile,
    link: '/dashboard/profile',
  },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  // },
];