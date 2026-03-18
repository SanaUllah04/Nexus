import * as React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'gray';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
  onClick
}: BadgeProps) => {
  const variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-primary-50/80 border-primary-200/50 text-primary-700 shadow-sm backdrop-blur-sm',
    secondary: 'bg-secondary-50/80 border-secondary-200/50 text-secondary-700 shadow-sm backdrop-blur-sm',
    accent: 'bg-accent-50/80 border-accent-200/50 text-accent-700 shadow-sm backdrop-blur-sm',
    success: 'bg-success-50/80 border-success-200/50 text-success-700 shadow-sm backdrop-blur-sm',
    warning: 'bg-warning-50/80 border-warning-200/50 text-warning-700 shadow-sm backdrop-blur-sm',
    error: 'bg-error-50/80 border-error-200/50 text-error-700 shadow-sm backdrop-blur-sm',
    gray: 'bg-gray-100/80 border-gray-200/50 text-gray-700 shadow-sm backdrop-blur-sm',
  };
  
  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';
  const interactiveClass = onClick ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200' : '';
  
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center font-semibold border ${roundedClass} ${variantClasses[variant]} ${sizeClasses[size]} ${interactiveClass} ${className}`}
    >
      {children}
    </span>
  );
};