import React, { useState } from 'react';
import { AppointmentCalendar } from './components/AppointmentCalendar';
import { VideoConsultationRoom } from './components/VideoConsultationRoom';
import { MedicalHistory } from './components/MedicalHistory';
import { SecureMessaging } from './components/SecureMessaging';
import { LayoutDashboard, Video, FileText, MessageSquare, Activity, LogOut, Bell } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('calendar');

  const renderContent = () => {
    switch (currentView) {
      case 'calendar':
        return <AppointmentCalendar />;
      case 'video':
        return <VideoConsultationRoom />;
      case 'history':
        return <MedicalHistory />;
      case 'messaging':
        return <SecureMessaging />;
      default:
        return <AppointmentCalendar />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        currentView === view 
          ? 'bg-teal-50 text-teal-700 font-medium shadow-sm' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
      }`}
    >
      <Icon size={20} className={currentView === view ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'} />
      <span>{label}</span>
      {view === 'messaging' && (
        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10">
        <div className="p-6 flex items-center space-x-2 border-b border-slate-100">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                <Activity size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">VitalLink</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
            <NavItem view="calendar" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="video" icon={Video} label="Tele-Consult" />
            <NavItem view="history" icon={FileText} label="Medical Records" />
            <NavItem view="messaging" icon={MessageSquare} label="Messages" />
        </nav>

        <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <h4 className="text-sm font-semibold mb-1">Upcoming Visit</h4>
                <p className="text-xs text-slate-500">Dr. Sarah Smith</p>
                <p className="text-xs text-teal-600 font-medium mt-1">Today, 2:00 PM</p>
            </div>
            <button className="w-full flex items-center space-x-2 px-4 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                <LogOut size={18} />
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
             <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                    <Activity size={20} />
                </div>
                <h1 className="text-lg font-bold">VitalLink</h1>
            </div>
            <button className="text-slate-500">
                <Bell size={24} />
            </button>
        </header>

        {/* Top Bar (Desktop) */}
        <header className="hidden md:flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-20">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    {currentView === 'calendar' && 'Welcome back, Alex'}
                    {currentView === 'video' && 'Consultation Room'}
                    {currentView === 'history' && 'Patient Records'}
                    {currentView === 'messaging' && 'Secure Messages'}
                </h2>
                <p className="text-sm text-slate-500">
                    {currentView === 'calendar' && 'Here is your schedule for today.'}
                    {currentView === 'video' && 'Connect with your provider securely.'}
                    {currentView === 'history' && 'View and download your medical history.'}
                    {currentView === 'messaging' && 'Direct line to your care team.'}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-semibold text-slate-800">Alex Thompson</p>
                        <p className="text-xs text-slate-500">Patient ID: #83921</p>
                    </div>
                    <img src="https://picsum.photos/200/200" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm" />
                </div>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-hidden relative">
            <div className="h-full max-w-7xl mx-auto animate-in fade-in duration-300 slide-in-from-bottom-2">
                {renderContent()}
            </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden bg-white border-t border-slate-200 flex justify-around p-3 pb-safe z-30">
             <button onClick={() => setCurrentView('calendar')} className={`p-2 rounded-lg ${currentView === 'calendar' ? 'text-teal-600 bg-teal-50' : 'text-slate-400'}`}><LayoutDashboard size={24} /></button>
             <button onClick={() => setCurrentView('video')} className={`p-2 rounded-lg ${currentView === 'video' ? 'text-teal-600 bg-teal-50' : 'text-slate-400'}`}><Video size={24} /></button>
             <button onClick={() => setCurrentView('history')} className={`p-2 rounded-lg ${currentView === 'history' ? 'text-teal-600 bg-teal-50' : 'text-slate-400'}`}><FileText size={24} /></button>
             <button onClick={() => setCurrentView('messaging')} className={`p-2 rounded-lg relative ${currentView === 'messaging' ? 'text-teal-600 bg-teal-50' : 'text-slate-400'}`}>
                <MessageSquare size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
