
import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md active:translate-y-px",
      secondary: "bg-brand-100 text-brand-700 hover:bg-brand-200 active:translate-y-px",
      outline: "border border-brand-200 bg-transparent hover:bg-brand-50 text-brand-700 active:translate-y-px",
      ghost: "bg-transparent hover:bg-brand-50 text-brand-700 active:translate-y-px",
      link: "bg-transparent underline-offset-4 hover:underline text-brand-700 hover:text-brand-800"
    };
    
    const sizes = {
      default: "h-10 px-6 py-2 rounded-md text-sm",
      sm: "h-8 px-4 py-1 rounded-md text-xs",
      lg: "h-12 px-8 py-3 rounded-md text-base",
      icon: "h-10 w-10 rounded-full"
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Add the buttonVariants function to fix build errors
export const buttonVariants = ({
  variant = 'primary',
  size = 'default',
  className = '',
}: {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
} = {}): string => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm hover:shadow-md active:translate-y-px",
    secondary: "bg-brand-100 text-brand-700 hover:bg-brand-200 active:translate-y-px",
    outline: "border border-brand-200 bg-transparent hover:bg-brand-50 text-brand-700 active:translate-y-px",
    ghost: "bg-transparent hover:bg-brand-50 text-brand-700 active:translate-y-px",
    link: "bg-transparent underline-offset-4 hover:underline text-brand-700 hover:text-brand-800"
  };
  
  const sizes = {
    default: "h-10 px-6 py-2 rounded-md text-sm",
    sm: "h-8 px-4 py-1 rounded-md text-xs",
    lg: "h-12 px-8 py-3 rounded-md text-base",
    icon: "h-10 w-10 rounded-full"
  };

  return cn(baseStyles, variants[variant], sizes[size], className);
};

export { Button };
