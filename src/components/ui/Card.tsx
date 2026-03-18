import * as React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) => {
  const hoverableClass = hoverable ? 'transform hover:-translate-y-1 hover:shadow-glass-hover transition-all duration-300 cursor-pointer' : 'transition-shadow duration-300 hover:shadow-md';
  const clickableClass = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/50' : '';
  
  // If the card already specifies a background color, we don't apply the 'glass' utility fully
  const hasBgClass = className.includes('bg-');
  const baseClasses = hasBgClass 
    ? `rounded-2xl shadow-sm border border-white/50 backdrop-blur-md relative overflow-hidden` 
    : `glass rounded-2xl`;
  
  return (
    <div 
      className={`${baseClasses} ${hoverableClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-50 pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}: CardHeaderProps) => {
  return (
    <div className={`px-6 py-5 border-b border-gray-100/50 bg-white/30 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}: CardBodyProps) => {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  );
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}: CardFooterProps) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100/50 bg-gray-50/30 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};