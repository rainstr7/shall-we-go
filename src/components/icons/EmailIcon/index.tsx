import React from 'react';

export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M3 4H17C18.1046 4 19 4.89543 19 6V14C19 15.1046 18.1046 16 17 16H3C1.89543 16 1 15.1046 1 14V6C1 4.89543 1.89543 4 3 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 6L10 11L1 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
