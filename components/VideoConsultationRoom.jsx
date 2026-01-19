import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Settings, ShieldCheck } from 'lucide-react';

export const VideoConsultationRoom = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="video-consultation-room flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-10 flex justify-between items-center text-white">
        <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="font-medium text-sm tracking-wide">04:23</span>
        </div>
        <div className="flex items-center space-x-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <ShieldCheck size={14} className="text-teal-400" />
            <span className="text-xs font-medium text-slate-200">End-to-End Encrypted</span>
        </div>
      </div>

      {/* Main Video Area (Doctor) */}
      <div className="flex-1 relative flex items-center justify-center bg-slate-800">
        <img 
            src="https://picsum.photos/1200/800" 
            alt="Doctor Feed" 
            className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-4 left-4 text-white bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
            <p className="text-sm font-semibold">Dr. Sarah Smith</p>
            <p className="text-xs text-slate-300">Cardiology</p>
        </div>
      </div>

      {/* PiP Video Area (Patient) */}
      <div className="absolute top-20 right-6 w-32 md:w-48 aspect-video bg-slate-700 rounded-xl overflow-hidden shadow-lg border-2 border-slate-600/50 z-20">
        <img 
            src="https://picsum.photos/400/300" 
            alt="My Feed" 
            className="w-full h-full object-cover"
        />
        {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-400">
                <VideoOff size={24} />
            </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-slate-900 flex items-center justify-center space-x-4 md:space-x-6 px-4 z-10 border-t border-slate-800">
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all duration-200 ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
        >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
        </button>

        <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full transition-all duration-200 ${isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
        >
            {isVideoOff ? <VideoOff size={22} /> : <Video size={22} />}
        </button>

        <button className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/30 transform hover:scale-105 transition-all duration-200 px-8">
            <PhoneOff size={24} />
        </button>

        <button className="p-4 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all duration-200">
            <MessageSquare size={22} />
        </button>
        
        <button className="p-4 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all duration-200">
            <Settings size={22} />
        </button>
      </div>
    </div>
  );
};
