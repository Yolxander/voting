
import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'default', size = 'md', className, ...props }: ButtonProps) {
  const buttonClasses = classNames(
    'inline-flex items-center justify-center font-semibold rounded',
    {
      'bg-blue-500 text-white': variant === 'default',
      'border border-gray-400 text-gray-700': variant === 'outline',
      'py-2 px-4 text-sm': size === 'sm',
      'py-3 px-6 text-base': size === 'md',
      'py-4 px-8 text-lg': size === 'lg',
    },
    className
  );

  return <button className={buttonClasses} {...props} />;
}
