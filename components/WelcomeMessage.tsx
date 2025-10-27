
import React from 'react';

export const WelcomeMessage: React.FC = () => (
  <div className="text-center py-10 px-6 bg-slate-800/50 rounded-lg border border-dashed border-slate-700">
    <p className="text-slate-400">Your calendar is empty.</p>
    <p className="text-slate-300 mt-1">
      Click the <span className="font-semibold text-cyan-400">🎤 Voice Note</span> button or type a note to add an event.
    </p>
  </div>
);
