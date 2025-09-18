'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'modal' | 'bottom';
  children: React.ReactNode;
}

export function Sheet({ isOpen, onClose, variant = 'modal', children }: SheetProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div
        className={cn(
          'absolute bg-surface transition-transform duration-200 ease-smooth',
          variant === 'modal' && 'inset-4 rounded-lg shadow-xl',
          variant === 'bottom' && 'bottom-0 left-0 right-0 rounded-t-lg shadow-xl max-h-[80vh] overflow-y-auto'
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-smooth"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
