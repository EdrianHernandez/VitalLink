import React, { useState } from 'react';
import { Appointment } from '../types';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', date: '2023-10-25', time: '09:00 AM', doctorName: 'Dr. Sarah Smith', specialty: 'Cardiology', status: 'booked' },
  { id: '2', date: '2023-10-25', time: '10:30 AM', doctorName: 'Dr. John Doe', specialty: 'General', status: 'available' },
  { id: '3', date: '2023-10-25', time: '02:00 PM', doctorName: 'Dr. Emily Chen', specialty: 'Dermatology', status: 'available' },
  { id: '4', date: '2023-10-26', time: '11:00 AM', doctorName: 'Dr. Alan Grant', specialty: 'Pediatrics', status: 'booked' },
  { id: '5', date: '2023-10-26', time: '03:30 PM', doctorName: 'Dr. Ellie Sattler', specialty: 'General', status: 'available' },
  { id: '6', date: '2023-10-27', time: '09:00 AM', doctorName: 'Dr. Ian Malcolm', specialty: 'Neurology', status: 'available' },
];

export const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-25');

  // Simple date navigation logic for demo purposes
  const dates = ['2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28', '2023-10-29'];

  const filteredAppointments = MOCK_APPOINTMENTS.filter(app => app.date === selectedDate);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col appointment-calendar-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Appointment Calendar</h2>
        <div className="flex space-x-2">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <ChevronLeft size={20} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex justify-between space-x-2 mb-8 overflow-x-auto pb-2">
        {dates.map((date) => {
           const d = new Date(date);
           const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
           const dayNum = d.getDate();
           const isSelected = selectedDate === date;
           
           return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl min-w-[80px] transition-all duration-200 ${
                isSelected 
                  ? 'bg-teal-600 text-white shadow-md transform scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider mb-1 opacity-80">{dayName}</span>
              <span className="text-xl font-bold">{dayNum}</span>
            </button>
           );
        })}
      </div>

      {/* Slots */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {filteredAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                <p>No appointments scheduled for this day.</p>
            </div>
        ) : (
            filteredAppointments.map((app) => (
            <div 
                key={app.id} 
                className={`appointment-slot flex items-center p-4 rounded-xl border-l-4 transition-all hover:shadow-md ${
                    app.status === 'booked' 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-teal-400 border border-slate-100'
                }`}
            >
                <div className="mr-4 p-3 bg-white rounded-full shadow-sm">
                    <Clock size={20} className={app.status === 'booked' ? 'text-blue-500' : 'text-teal-500'} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-slate-800">{app.time}</h3>
                            <p className="text-sm text-slate-600 flex items-center mt-1">
                                <User size={14} className="mr-1" />
                                {app.doctorName} <span className="mx-2 text-slate-300">|</span> {app.specialty}
                            </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === 'booked' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-teal-100 text-teal-700'
                        }`}>
                            {app.status === 'booked' ? 'Confirmed' : 'Available'}
                        </span>
                    </div>
                </div>
                {app.status === 'available' && (
                    <button className="ml-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
                        Book
                    </button>
                )}
            </div>
            ))
        )}
      </div>
    </div>
  );
};