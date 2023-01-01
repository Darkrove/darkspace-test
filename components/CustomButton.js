import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles, status }) => {
  return (
    <>
      {
        status
          ? (
            <button
              type={btnType}
              className={`font-epilogue opacity-60 font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
              onClick={handleClick}
              disabled
            >
              <div class="flex justify-center">
                <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>

            </button>
          )
          : (
            <button
              type={btnType}
              className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
              onClick={handleClick}
            >
              ⚡ {title}
            </button>
          )
      }
    </>
  )
}
export default CustomButton