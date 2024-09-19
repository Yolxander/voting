// File: components/ui/checkbox.tsx
import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  const checkboxClasses = classNames(
    'h-4 w-4 border border-gray-300 rounded text-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
    className
  );

  return <input type="checkbox" className={checkboxClasses} {...props} />;
}
