import React from 'react';
import { FileText, Pill, Calendar, Download } from 'lucide-react';

const MOCK_HISTORY = [
  {
    id: '101',
    date: 'Oct 10, 2023',
    doctorName: 'Dr. Sarah Smith',
    summary: 'Routine cardiology checkup. BP 120/80. Heart rhythm normal.',
    medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' }
    ]
  },
  {
    id: '102',
    date: 'Aug 15, 2023',
    doctorName: 'Dr. John Doe',
    summary: 'Patient reported mild headaches. Migraine prescribed.',
    medications: [
        { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed' },
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 6 hours' }
    ]
  }
];

export const MedicalHistory = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-semibold text-slate-800">Medical History</h2>
            <p className="text-slate-500 mt-1">Your recent visits and prescriptions</p>
        </div>
        <button className="text-teal-600 font-medium hover:text-teal-700 text-sm flex items-center">
            <Download size={16} className="mr-1" /> Download All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {MOCK_HISTORY.map((record) => (
          <div key={record.id} className="medical-history-card bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-teal-100 p-2 rounded-lg text-teal-700">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">{record.date}</p>
                        <p className="text-xs text-slate-500">Consultation with {record.doctorName}</p>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <FileText size={18} />
                </button>
            </div>
            
            {/* Content */}
            <div className="p-5">
                <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</h4>
                    <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {record.summary}
                    </p>
                </div>

                {record.medications.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prescriptions</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {record.medications.map((med, idx) => (
                                <div key={idx} className="flex items-center p-3 border border-slate-100 rounded-lg hover:border-teal-200 transition-colors">
                                    <Pill size={16} className="text-teal-500 mr-3" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{med.name}</p>
                                        <p className="text-xs text-slate-500">{med.dosage} • {med.frequency}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
