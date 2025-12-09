// Appointment Types
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  status: "available" | "booked" | "partially-booked";
}

export interface DateAvailability {
  date: string; // YYYY-MM-DD format
  status: "available" | "booked" | "partially-booked";
  availableSlots: number;
  totalSlots: number;
}

export interface AppointmentFormData {
  firstName: string;
  email: string;
  phone: string;
  bookingType: string;
  location: string;
  address: string;
  selectedDate: string;
  selectedTimeSlot: string;
  notes?: string;
}

export interface Appointment {
  id: number;
  date: string;
  timeSlot: string;
  firstName: string;
  email: string;
  phone: string;
  bookingType: string;
  location: string;
  address: string;
  notes?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

// WordPress API Response Types
export interface WPAppointmentResponse {
  success: boolean;
  data?: Appointment;
  message?: string;
}

export interface WPAvailabilityResponse {
  success: boolean;
  data?: DateAvailability[];
  message?: string;
}

export interface WPTimeSlotsResponse {
  success: boolean;
  data?: TimeSlot[];
  message?: string;
}
