// File: components/ui/input.tsx
import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  const inputClasses = classNames(
    'block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
    className
  );

  return <input className={inputClasses} {...props} />;
}
