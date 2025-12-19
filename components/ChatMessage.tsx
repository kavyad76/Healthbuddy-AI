
import React from 'react';
import { Message } from '../types';
import { Icons } from '../constants';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end animate-fade-in-up'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border shadow-sm ${isAssistant ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-200'}`}>
          {isAssistant ? <Icons.Robot /> : <Icons.User />}
        </div>
        
        <div className={`mx-3 p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isAssistant 
            ? 'bg-white border border-slate-100 text-slate-800' 
            : 'bg-sky-600 text-white font-medium'
        }`}>
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>

          {isAssistant && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider flex items-center">
                <Icons.Info /> <span className="ml-1">Trusted Sources</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, idx) => (
                  <a 
                    key={idx} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] bg-slate-50 border border-slate-200 text-sky-700 px-2 py-1 rounded-md hover:bg-sky-50 transition-colors duration-200 truncate max-w-[200px]"
                    title={source.title}
                  >
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          <div className={`mt-2 text-[10px] ${isAssistant ? 'text-slate-400' : 'text-sky-100 text-right'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
