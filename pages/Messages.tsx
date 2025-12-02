import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../constants';
import { Button } from '../components/Button';
import { Send, User, Headset } from 'lucide-react';

export const Messages: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'USER' as const,
      text: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setInput('');

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
         id: (Date.now() + 1).toString(),
         sender: 'SUPPORT',
         text: "Thanks for your message. An agent will review your request shortly.",
         timestamp: new Date().toISOString()
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden max-w-3xl mx-auto">
       <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center">
             <Headset className="w-5 h-5 mr-2 text-blue-600" /> Support Ticket #9921
          </h2>
          <p className="text-xs text-slate-500 ml-7">Regarding Order ORD-2023-002</p>
       </div>

       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                   msg.sender === 'USER' 
                     ? 'bg-blue-600 text-white rounded-tr-none' 
                     : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                   <p>{msg.text}</p>
                   <p className={`text-[10px] mt-1 ${msg.sender === 'USER' ? 'text-blue-200' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </p>
                </div>
             </div>
          ))}
       </div>

       <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex space-x-2">
          <input 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
             placeholder="Type a message..."
          />
          <Button type="submit" disabled={!input.trim()}>
             <Send className="w-4 h-4" />
          </Button>
       </form>
    </div>
  );
};
