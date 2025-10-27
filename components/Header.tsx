
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center my-8">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
      AI Note to Calendar
    </h1>
    <p className="text-slate-400 mt-2">
      Instantly turn your voice or text notes into structured calendar events.
    </p>
  </header>
);
