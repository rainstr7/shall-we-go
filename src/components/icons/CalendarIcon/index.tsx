import React from 'react';

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M6 2V6M14 2V6M3 8H17M3 4H17C18.1046 4 19 4.89543 19 6V16C19 17.1046 18.1046 18 17 18H3C1.89543 18 1 17.1046 1 16V6C1 4.89543 1.89543 4 3 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
