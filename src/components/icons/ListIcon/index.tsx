import React from 'react';

interface ListIconProps {
  size?: number;
}

export function ListIcon({ size = 24 }: ListIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 6h16M4 10h16M4 14h16M4 18h16" 
      />
    </svg>
  );
}
