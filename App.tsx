
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CalendarEvent } from './types';
import { extractEventDetails } from './services/geminiService';
import { Header } from './components/Header';
import { InputControls } from './components/InputControls';
import { EventCard } from './components/EventCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [textNote, setTextNote] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processNote(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition not supported in this browser.');
    }
  }, []);

  const processNote = useCallback(async (note: string) => {
    if (!note.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      const structuredEvent = await extractEventDetails(note);
      setEvents(prevEvents => [structuredEvent, ...prevEvents]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to process note. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processNote(textNote);
    setTextNote('');
  };

  const handleVoiceStart = () => {
    if (recognitionRef.current && !isListening && !isProcessing) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main>
          <InputControls
            textNote={textNote}
            setTextNote={setTextNote}
            onTextSubmit={handleTextSubmit}
            onVoiceStart={handleVoiceStart}
            isListening={isListening}
            isProcessing={isProcessing}
          />
          {isProcessing && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          <div className="mt-8">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Calendar Events</h2>
            <div className="space-y-4">
              {events.length === 0 && !isProcessing ? (
                <WelcomeMessage />
              ) : (
                events.map((event, index) => <EventCard key={index} event={event} />)
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
