import React from 'react';

interface PremiumStarIconProps {
  size?: number;
  className?: string;
}

const PremiumStarIcon: React.FC<PremiumStarIconProps> = ({ size = 18, className }) => {
  return (
    <svg 
      width={size} 
      height={size - 1} 
      viewBox="0 0 18 17" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8.8291 6.74023L9.37793 7.7002L10.458 7.94043L11.3301 8.13379L11.2324 8.23242L10.5 8.96484V11H8.59473L8.20898 11.1279L7.89355 11.2324L7.92578 11.1064L8.2959 9.62402L7.41992 8.85742L7.47852 8.85156L8.12012 7.8252L8.81348 6.71387L8.8291 6.74023Z" stroke="url(#paint0_linear_274_2543)" strokeWidth="5"/>
      <path d="M9 1L11.472 5.93691L17 6.73344L13 10.5741L13.944 16L9 13.4369L4.056 16L5 10.5741L1 6.73344L6.528 5.93691L9 1Z" stroke="url(#paint1_linear_274_2543)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_274_2543" x1="21.125" y1="3.90517" x2="-1.32046" y2="17.0189" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A776FC"/>
          <stop offset="0.9999" stopColor="#8239FF"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_274_2543" x1="22.6552" y1="3.19828" x2="-2.66277" y2="17.3442" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A776FC"/>
          <stop offset="0.9999" stopColor="#8239FF"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PremiumStarIcon;
