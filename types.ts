export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  status: 'booked' | 'available' | 'past';
}

export interface Message {
  id: string;
  sender: 'patient' | 'provider';
  text: string;
  timestamp: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  summary: string;
  medications: Medication[];
}

export type ViewState = 'calendar' | 'video' | 'history' | 'messaging';