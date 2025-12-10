"use client";

import { useState, useRef } from "react";
import AppointmentCalendar, {
  AppointmentCalendarRef,
} from "@/components/organisms/AppointmentCalendar";
import AppointmentForm from "@/components/organisms/AppointmentForm";

export default function AppointmentSection() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarRef = useRef<AppointmentCalendarRef>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleAppointmentSuccess = () => {
    setSelectedDate(null);
  };

  const handleRevalidate = () => {
    // Refetch calendar availability
    calendarRef.current?.refetch();
  };

  return (
    <section className="w-full">
      <div className="main-wrapper mx-auto">
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-30">
          {/* Header */}
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5 text-center">
            <div className="flex gap-3 items-center justify-center">
              <h2 className="text-black font-poppins font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
                Schedule Your Visit
              </h2>
            </div>
            <p className="font-inter text-base md:text-lg text-text max-w-2xl mx-auto px-4">
              Choose a convenient date and time to visit our showroom or
              schedule a home visit. Our experts will guide you through our
              premium carpet collection.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
            {/* Calendar Section */}
            <div className="space-y-5 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-poppins font-medium text-xl md:text-2xl text-black">
                  Select Date
                </h3>
                <p className="font-inter text-sm text-black/60">
                  Choose an available date for your appointment. Dates in dark
                  blue are fully booked.
                </p>
              </div>
              <AppointmentCalendar
                ref={calendarRef}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 md:p-6 lg:p-8 mt-6 md:mt-8 lg:mt-10">
                <h4 className="font-poppins font-medium text-lg md:text-xl text-black mb-3 md:mb-4">
                  Important Information
                </h4>
                <ul className="space-y-3 md:space-y-4 font-inter text-sm md:text-base text-black/70">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Appointments must be booked at least 24 hours in advance
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      You will receive a confirmation email once your booking is
                      approved
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      For urgent inquiries, please call us directly at (021)
                      7197770
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Home visit service is available within Jakarta and
                      surrounding areas
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-poppins font-medium text-2xl text-black">
                  Appointment Details
                </h3>
                <p className="font-inter text-sm text-black/60">
                  Fill in your details and select a preferred time slot.
                </p>
                {selectedDate && (
                  <p className="font-inter text-sm font-medium text-primary">
                    Selected Date:{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
              <AppointmentForm
                selectedDate={selectedDate}
                onSuccess={handleAppointmentSuccess}
                onRevalidate={handleRevalidate}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
