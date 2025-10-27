
import React from 'react';
import type { CalendarEvent } from '../types';

interface EventCardProps {
  event: CalendarEvent;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700 animate-fade-in">
      <h3 className="text-lg font-bold text-cyan-400">{event.title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-slate-300">
        <div className="flex items-center">
          <CalendarIcon />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon />
          <span>{event.time}</span>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-3 pt-3 border-t border-slate-700 italic">
        Original note: "{event.rawText}"
      </p>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if not using a separate CSS file.
// For simplicity here, we can rely on adding this to index.html if needed,
// but modern build tools would handle this. We'll use a simple approach for this context.
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);
