// Mock data storage (in-memory untuk development)
// Nanti ini bisa diganti dengan database atau localStorage

import { Appointment } from "@/lib/types/appointment";

// Simulated database
let appointments: Appointment[] = [
  // Sample data
  {
    id: 1,
    date: "2025-12-15",
    timeSlot: "slot2",
    firstName: "John Doe",
    email: "john@example.com",
    phone: "08123456789",
    bookingType: "consultation",
    location: "kemang",
    address: "Jakarta",
    notes: "Sample booking",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    date: "2025-12-10",
    timeSlot: "slot1",
    firstName: "Jane Smith",
    email: "jane@example.com",
    phone: "08198765432",
    bookingType: "viewing",
    location: "bekasi",
    address: "Bekasi",
    notes: "",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    date: "2025-12-11",
    timeSlot: "slot1",
    firstName: "Jane Smith",
    email: "jane@example.com",
    phone: "08198765432",
    bookingType: "viewing",
    location: "bekasi",
    address: "Bekasi",
    notes: "",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

export const mockDB = {
  // Get all appointments
  getAll: (): Appointment[] => {
    return appointments;
  },

  // Get appointments by date range
  getByDateRange: (startDate: string, endDate: string): Appointment[] => {
    return appointments.filter(
      (apt) => apt.date >= startDate && apt.date <= endDate
    );
  },

  // Get appointments by date
  getByDate: (date: string): Appointment[] => {
    return appointments.filter((apt) => apt.date === date);
  },

  // Check if time slot is booked
  isSlotBooked: (date: string, timeSlot: string): boolean => {
    return appointments.some(
      (apt) =>
        apt.date === date &&
        apt.timeSlot === timeSlot &&
        (apt.status === "confirmed" || apt.status === "pending")
    );
  },

  // Create new appointment
  create: (data: Omit<Appointment, "id" | "createdAt">): Appointment => {
    const newAppointment: Appointment = {
      ...data,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    return newAppointment;
  },

  // Update appointment status
  updateStatus: (id: number, status: Appointment["status"]): boolean => {
    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      apt.status = status;
      return true;
    }
    return false;
  },

  // Delete appointment
  delete: (id: number): boolean => {
    const index = appointments.findIndex((a) => a.id === id);
    if (index !== -1) {
      appointments.splice(index, 1);
      return true;
    }
    return false;
  },

  // Get availability stats for a date
  getDateAvailability: (date: string, totalSlots: number = 6) => {
    const bookedAppointments = appointments.filter(
      (apt) =>
        apt.date === date &&
        (apt.status === "confirmed" || apt.status === "pending")
    );
    const bookedCount = bookedAppointments.length;
    const availableSlots = totalSlots - bookedCount;

    let status: "available" | "booked" | "pending" | "partially-booked" =
      "available";
    if (availableSlots === 0) {
      status = "booked";
    } else if (availableSlots < totalSlots) {
      const hasPending = bookedAppointments.some(
        (apt) => apt.status === "pending"
      );
      status = hasPending ? "pending" : "partially-booked";
    }

    return {
      date,
      status,
      availableSlots,
      totalSlots,
    };
  },
};
