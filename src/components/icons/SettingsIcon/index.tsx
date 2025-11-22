import React from 'react';

interface SettingsIconProps {
  size?: number;
  className?: string;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({ size = 32, className }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M24 5.33301V26.6663" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.3333 16H26.6666" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 5.33301V26.6663" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3333 21.333H18.6666" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 5.33301V26.6663" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.33325 10.667H10.6666" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default SettingsIcon;
