'use client';

import { useState } from 'react';
import { Menu, Settings, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Sheet } from './ui/Sheet';
import { useOnchainKit } from '@coinbase/onchainkit';

export function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useOnchainKit();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-3 max-w-lg mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-slate-900">
              EchoScribe
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(true)}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Menu Sheet */}
      <Sheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        variant="bottom"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">
                {user?.displayName || 'Guest User'}
              </p>
              <p className="text-sm text-slate-600">Free Plan</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-smooth">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-slate-900">Settings</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-slate-900">Help & Support</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              <span className="text-slate-900">Upgrade to Premium</span>
            </button>
          </nav>
        </div>
      </Sheet>
    </>
  );
}
