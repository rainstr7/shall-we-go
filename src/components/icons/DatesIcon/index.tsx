import React from 'react';

interface DatesIconProps {
  size?: number;
  className?: string;
}

const DatesIcon: React.FC<DatesIconProps> = ({ size = 33, className }) => {
  return (
    <svg 
      viewBox="0 0 33 33" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g clipPath="url(#clip0_133_26)">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.5 27.5C6.96575 27.5 5.5 24.9219 5.5 17.1875C5.5 9.45312 6.96575 6.875 16.5 6.875C26.0342 6.875 27.5 9.45312 27.5 17.1875C27.5 24.9219 26.0342 27.5 16.5 27.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.875 13.75H26.125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.375 4.125V9.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.625 4.125V9.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 19.25C13.75 20.0104 13.1354 20.625 12.375 20.625C11.6146 20.625 11 20.0104 11 19.25C11 18.4896 11.6146 17.875 12.375 17.875C13.1354 17.875 13.75 18.4896 13.75 19.25Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.875 19.25C17.875 20.0104 17.2604 20.625 16.5 20.625C15.7396 20.625 15.125 20.0104 15.125 19.25C15.125 18.4896 15.7396 17.875 16.5 17.875C17.2604 17.875 17.875 18.4896 17.875 19.25Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M22 19.25C22 20.0104 21.3854 20.625 20.625 20.625C19.8646 20.625 19.25 20.0104 19.25 19.25C19.25 18.4896 19.8646 17.875 20.625 17.875C21.3854 17.875 22 18.4896 22 19.25Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_133_26">
          <rect width="33" height="33" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default DatesIcon;
