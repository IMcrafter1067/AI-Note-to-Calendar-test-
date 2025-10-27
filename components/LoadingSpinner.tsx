
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-6">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
    <p className="ml-3 text-slate-400">AI is thinking...</p>
  </div>
);
