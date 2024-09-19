// File: components/ui/select.tsx
import { ReactNode, useState } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || 'Select...'}
      </div>
      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full z-10">
          {children}
        </div>
      )}
    </div>
  );
}

Select.Trigger = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

Select.Content = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

Select.Item = ({ value, children, onClick }: { value: string; children: ReactNode; onClick: () => void }) => {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
