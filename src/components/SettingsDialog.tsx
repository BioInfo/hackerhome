import React from 'react';
import { Moon, Sun, Infinity, List, GripHorizontal, Sparkles, Layout } from 'lucide-react';
import type { SourceConfig } from '../types';
import { useInterfaceMode } from '../features/interface-modes';

interface SettingsDialogProps {
  isDarkMode: boolean;
  infiniteScrollEnabled: boolean;
  onThemeToggle: () => void;
  onInfiniteScrollToggle: () => void;
  sources: SourceConfig[];
  onSourceToggle: (sourceId: string) => void;
  onSourcesReorder: (sources: SourceConfig[]) => void;
}

export default function SettingsDialog({
  isDarkMode,
  infiniteScrollEnabled,
  onThemeToggle,
  onInfiniteScrollToggle,
  sources,
  onSourceToggle,
  onSourcesReorder
}: SettingsDialogProps) {
  const { mode, setMode, config } = useInterfaceMode();
  
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const buttonBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const buttonHoverColor = isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200';
  const descriptionColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const selectedBgColor = isDarkMode ? 'bg-blue-600' : 'bg-blue-500';

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newSources = [...sources];
    const [removed] = newSources.splice(sourceIndex, 1);
    newSources.splice(targetIndex, 0, removed);
    onSourcesReorder(newSources);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <dialog 
      id="settings-dialog" 
      className={`${bgColor} ${textColor} rounded-lg p-6 w-[480px] backdrop:bg-black backdrop:bg-opacity-50`}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Settings</h2>
          <form method="dialog">
            <button className="text-gray-400 hover:text-gray-300">&times;</button>
          </form>
        </div>

        {/* Interface Mode Section */}
        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div>
            <h3 className="font-medium mb-2">Interface Mode</h3>
            <p className={`text-sm ${descriptionColor} mb-4`}>
              Choose between simple and advanced interface modes
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setMode('simple')}
                className={`flex-1 p-3 rounded-lg ${mode === 'simple' ? selectedBgColor + ' text-white' : buttonBgColor} transition-colors flex items-center justify-center space-x-2`}
              >
                <Layout className="w-5 h-5" />
                <span>Simple Mode</span>
              </button>
              <button
                onClick={() => setMode('advanced')}
                className={`flex-1 p-3 rounded-lg ${mode === 'advanced' ? selectedBgColor + ' text-white' : buttonBgColor} transition-colors flex items-center justify-center space-x-2`}
              >
                <Sparkles className="w-5 h-5" />
                <span>Advanced Mode</span>
              </button>
            </div>
            <div className={`mt-4 p-3 rounded-lg ${buttonBgColor}`}>
              <h4 className="font-medium mb-2">Current Features</h4>
              <ul className={`text-sm ${descriptionColor} space-y-1`}>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                  Essential Features
                </li>
                {mode === 'advanced' && (
                  <>
                    <li className="flex items-center">
                      <span className="w-4 h-4 rounded-full bg-green-500 mr-2"></span>
                      Advanced Interactions
                    </li>
                    {config.features.experimental && (
                      <li className="flex items-center">
                        <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                        Experimental Features
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div>
            <h3 className="font-medium mb-2">News Sources</h3>
            <p className={`text-sm ${descriptionColor} mb-4`}>
              Select and arrange your news sources. Drag to reorder.
            </p>
            <div className="space-y-2">
              {sources.map((source, index) => (
                <div
                  key={source.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                  className={`flex items-center justify-between p-3 ${buttonBgColor} rounded-lg cursor-move`}
                >
                  <div className="flex items-center space-x-3">
                    <GripHorizontal className="w-4 h-4 text-gray-500" />
                    <span>{source.name}</span>
                    {(source.id === 'producthunt' || source.id === 'medium' || source.id === 'hashnode' || source.id === 'lobsters') && (
                      <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">Coming Soon</span>
                    )}
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={source.enabled}
                      onChange={() => onSourceToggle(source.id)}
                      disabled={source.id === 'producthunt' || source.id === 'medium' || source.id === 'hashnode' || source.id === 'lobsters'}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 ${source.id === 'producthunt' || source.id === 'medium' || source.id === 'hashnode' || source.id === 'lobsters' ? 'bg-gray-400' : 'bg-gray-600'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className={`text-sm ${descriptionColor}`}>Choose your preferred theme</p>
            </div>
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg ${buttonBgColor} ${buttonHoverColor} transition-colors flex items-center space-x-2`}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Infinite Scroll</h3>
              <p className={`text-sm ${descriptionColor}`}>Enable or disable automatic content loading</p>
            </div>
            <button
              onClick={onInfiniteScrollToggle}
              className={`p-2 rounded-lg ${buttonBgColor} ${buttonHoverColor} transition-colors flex items-center space-x-2`}
            >
              {infiniteScrollEnabled ? (
                <>
                  <List className="w-5 h-5" />
                  <span>Disable</span>
                </>
              ) : (
                <>
                  <Infinity className="w-5 h-5" />
                  <span>Enable</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${borderColor}`}>
          <div>
            <h3 className="font-medium">About</h3>
            <p className={`text-sm ${descriptionColor}`}>
              HackerHome aggregates content from multiple tech news sources, featuring a dual-mode interface for both casual and power users. Currently featuring Hacker News, DEV.to, and GitHub trending repositories, with more sources coming soon!
            </p>
            {mode === 'simple' && (
              <p className={`mt-2 text-sm ${descriptionColor}`}>
                Tip: Switch to Advanced Mode for additional features and customization options.
              </p>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}