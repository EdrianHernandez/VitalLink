import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Shield } from 'lucide-react';

const MOCK_MESSAGES = [
  { id: '1', sender: 'provider', text: 'Hello! I reviewed your latest blood work. Everything looks stable.', timestamp: '10:30 AM' },
  { id: '2', sender: 'patient', text: 'That is great news, Dr. Smith. Should I continue with the current dosage?', timestamp: '10:32 AM' },
  { id: '3', sender: 'provider', text: 'Yes, please continue the Lisinopril as prescribed. Let’s schedule a follow-up in 3 months.', timestamp: '10:35 AM' },
];

export const SecureMessaging = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const msg = {
        id: Date.now().toString(),
        sender: 'patient',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-100 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center space-x-3">
            <div className="relative">
                <img src="https://picsum.photos/100/100" alt="Doctor" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
                <h3 className="font-semibold text-slate-800">Dr. Sarah Smith</h3>
                <p className="text-xs text-green-600 flex items-center font-medium">
                    <Shield size={10} className="mr-1" /> Secure Connection
                </p>
            </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
            const isPatient = msg.sender === 'patient';
            return (
                <div key={msg.id} className={`flex w-full ${isPatient ? 'justify-end' : 'justify-start'}`}>
                    <div className={`patient-chat-bubble max-w-[80%] flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}>
                        <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                            isPatient 
                                ? 'bg-teal-600 text-white rounded-br-none' 
                                : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all">
            <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors">
                <Paperclip size={20} />
            </button>
            <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message securely..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700 placeholder-slate-400"
            />
            <button 
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className={`p-2 rounded-full transition-all ${
                    newMessage.trim() 
                        ? 'bg-teal-600 text-white shadow-md hover:bg-teal-700 transform hover:scale-105' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};
