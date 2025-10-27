
import React from 'react';

interface InputControlsProps {
  textNote: string;
  setTextNote: (value: string) => void;
  onTextSubmit: (e: React.FormEvent) => void;
  onVoiceStart: () => void;
  isListening: boolean;
  isProcessing: boolean;
}

const MicIcon = ({ isListening }: { isListening: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-2 ${isListening ? 'text-red-400' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

export const InputControls: React.FC<InputControlsProps> = ({
  textNote,
  setTextNote,
  onTextSubmit,
  onVoiceStart,
  isListening,
  isProcessing,
}) => {
  const isDisabled = isListening || isProcessing;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-700">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={onVoiceStart}
          disabled={isDisabled}
          className={`
            w-full sm:w-auto flex-shrink-0 flex items-center justify-center px-4 py-3 rounded-md font-semibold transition-all duration-300
            ${isListening ? 'bg-red-600 animate-pulse' : 'bg-cyan-500 hover:bg-cyan-600'}
            disabled:bg-slate-600 disabled:cursor-not-allowed
          `}
        >
          <MicIcon isListening={isListening} />
          {isListening ? 'Listening...' : 'Voice Note'}
        </button>
        <div className="hidden sm:block border-l border-slate-600 h-8"></div>
        <form onSubmit={onTextSubmit} className="w-full flex gap-4">
          <input
            type="text"
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            placeholder="Or type e.g., 'Team meeting tomorrow at 3pm'"
            disabled={isDisabled}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isDisabled || !textNote.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
