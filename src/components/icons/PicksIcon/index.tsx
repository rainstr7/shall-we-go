import React from 'react';

interface PicksIconProps {
  size?: number;
  className?: string;
}

const PicksIcon: React.FC<PicksIconProps> = ({ size = 32, className }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.2122 26.6667C8.12424 26.6667 6.87891 25.8333 6.87891 23.3333C6.87891 20.8333 8.12424 20 16.2122 20C24.3002 20 25.5456 20.8333 25.5456 23.3333C25.5456 25.8333 24.3002 26.6667 16.2122 26.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23.5989 20.6133C25.0255 16.5733 27.8922 8 26.8789 8C25.5455 8 20.2122 12 20.2122 12C20.2122 12 17.5455 4 16.2122 4C14.8789 4 12.2122 12 12.2122 12C12.2122 12 6.87887 8 5.54554 8C4.53221 8 7.39887 16.5733 8.82554 20.6133" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export default PicksIcon;
