import React from 'react';

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M5 8V6C5 3.79086 6.79086 2 9 2H11C13.2091 2 15 3.79086 15 6V8M5 8H3C1.89543 8 1 8.89543 1 10V16C1 17.1046 1.89543 18 3 18H17C18.1046 18 19 17.1046 19 16V10C19 8.89543 18.1046 8 17 8H15M5 8H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
