import React from 'react';

interface GapProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gapSizes = {
  xs: '4px',
  sm: '8px', 
  md: '16px',
  lg: '24px',
  xl: '32px'
};

export const Gap: React.FC<GapProps> = ({ size = 'md', className = '' }) => {
  const gapStyle = {
    height: gapSizes[size],
    minHeight: gapSizes[size],
    width: '100%',
    flexShrink: 0
  };

  return <div style={gapStyle} className={className} />;
};
