import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error 
    ? 'border-error-300 focus:border-error-500 focus:ring-error-500/20 bg-error-50/30' 
    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 bg-white/60 hover:bg-white/90 backdrop-blur-sm';
  
  const inputBaseClass = `block rounded-xl shadow-sm border-2 focus:ring-4 focus:outline-none transition-all duration-300 sm:text-sm ${errorClass}`;
  const adornmentClass = startAdornment ? 'pl-11' : '';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300">
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${inputBaseClass} ${adornmentClass} ${widthClass} py-2.5 px-3.5`}
          {...props}
        />
        
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400">
            {endAdornment}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1.5 ml-1 text-sm font-medium ${error ? 'text-error-500' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';