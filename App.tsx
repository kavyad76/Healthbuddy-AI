
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, GroundingSource } from './types';
import { geminiService } from './services/geminiService';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import { Icons } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm Healio, your virtual healthcare assistant. I'm here to provide health information and support. How can I help you today?\n\nPlease remember: I can't provide a diagnosis or medical treatment. If you're experiencing a medical emergency, please call 911 immediately.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare history for API
      const history = messages.slice(-6).map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const response = await geminiService.getHealthAdvice(userMessage.content, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        sources: response.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError("I'm having trouble connecting right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header (Mobile-Friendly) */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3 lg:hidden">
            <div className="bg-sky-600 p-1.5 rounded-lg text-white">
              <Icons.Heart />
            </div>
            <h1 className="text-lg font-bold">Healio</h1>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-slate-700">Chat Session</h2>
            <p className="text-xs text-slate-400">Response time: ~2s</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Assistant Online</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Icons.Info />
            </button>
          </div>
        </header>

        {/* Emergency Alert Bar (Mobile) */}
        <div className="lg:hidden bg-rose-50 px-6 py-2 border-b border-rose-100 flex items-center justify-between">
          <p className="text-[10px] text-rose-700 font-bold uppercase tracking-wider">Emergency? Call 911</p>
          <a href="tel:911" className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-bold">CALL</a>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start items-center space-x-2 animate-pulse mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Icons.Robot />
                </div>
                <div className="bg-slate-100 h-12 w-32 rounded-2xl border border-slate-200 flex items-center justify-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-lg flex items-center space-x-2">
                <Icons.Emergency />
                <span>{error}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-4 md:p-6 pb-8 md:pb-10">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question (e.g. 'Symptoms of common cold')..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm shadow-inner"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-200 ${
                  input.trim() && !isLoading
                    ? 'bg-sky-600 text-white shadow-md hover:bg-sky-700 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Icons.Send />
              </button>
            </form>
            <p className="mt-4 text-center text-[10px] text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Healio AI Assistant should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
