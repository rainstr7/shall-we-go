import React from 'react';

interface GameIconProps {
  size?: number;
  className?: string;
}

const GameIcon: React.FC<GameIconProps> = ({ size = 40, className }) => {
  return (
    <svg 
      viewBox="0 0 40 41" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <path fillRule="evenodd" clipRule="evenodd" d="M20 30.75C11.6667 30.75 10 29.0417 10 20.5C10 11.9583 11.6667 10.25 20 10.25C28.3333 10.25 30 11.9583 30 20.5C30 29.0417 28.3333 30.75 20 30.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M35 15.375V25.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 15.375V25.625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export default GameIcon;
