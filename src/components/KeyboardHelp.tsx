import React from 'react';
import { Keyboard } from 'lucide-react';

interface KeyboardHelpProps {
  isDarkMode: boolean;
}

export default function KeyboardHelp({ isDarkMode }: KeyboardHelpProps) {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const kbdBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const buttonBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const buttonHoverColor = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button 
        className={`p-2 ${buttonBgColor} rounded-full ${buttonHoverColor} transition-colors`}
        onClick={() => document.getElementById('keyboard-help')?.showModal()}
      >
        <Keyboard className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </button>

      <dialog id="keyboard-help" className={`${bgColor} ${textColor} rounded-lg p-6 backdrop:bg-black backdrop:bg-opacity-50`}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
          
          <div className="space-y-2">
            <h3 className="font-medium">Navigation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>1</kbd>
                <span>Focus Hacker News</span>
              </div>
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>2</kbd>
                <span>Focus DEV.to</span>
              </div>
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>3</kbd>
                <span>Focus GitHub</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Feed Types</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>T</kbd>
                <span>Top Stories</span>
              </div>
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>N</kbd>
                <span>New/Latest</span>
              </div>
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>B</kbd>
                <span>Best/Rising</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Other</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>?</kbd>
                <span>Show/Hide Help</span>
              </div>
              <div className="flex items-center">
                <kbd className={`px-2 py-1 ${kbdBgColor} rounded mr-2`}>Esc</kbd>
                <span>Close Help</span>
              </div>
            </div>
          </div>
        </div>

        <form method="dialog" className="mt-6 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
}