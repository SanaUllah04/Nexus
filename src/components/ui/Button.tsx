import * as React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'error';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles: Animated, rounded-xl, smooth transition
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95';
  
  // Size styles
  const sizeStyles = {
    xs: 'text-xs px-3 py-1.5',
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
    xl: 'text-lg px-8 py-4',
  };
  
  // Variant styles: With rich gradients and glassmorphism hover where suitable
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-primary-500/30 border border-primary-500/50',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-secondary-500/30 border border-secondary-500/50',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-400 text-white hover:from-accent-600 hover:to-accent-500 hover:-translate-y-0.5 shadow-md hover:shadow-lg hover:shadow-accent-500/30 border border-accent-500/50',
    outline: 'border-2 border-gray-200 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white hover:border-primary-200 hover:text-primary-600 hover:-translate-y-0.5 shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-primary-600',
    link: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline p-0 active:scale-100',
    success: 'bg-gradient-to-r from-success-500 to-success-400 text-white hover:-translate-y-0.5 shadow-md',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-400 text-white hover:-translate-y-0.5 shadow-md',
    error: 'bg-gradient-to-r from-error-500 to-error-400 text-white hover:-translate-y-0.5 shadow-md',
  };
  
  // Loading state
  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed transform-none active:scale-100' : '';
  
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled state
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none transform-none' : '';
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${loadingClass} ${disabledClass} ${className}`;
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2.5 transition-transform group-hover:scale-110">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2.5 transition-transform group-hover:translate-x-1">{rightIcon}</span>}
    </button>
  );
};