"use client";

import { useState, useRef } from "react";
import AppointmentCalendar, {
  AppointmentCalendarRef,
} from "@/components/organisms/AppointmentCalendar";
import AppointmentForm from "@/components/organisms/AppointmentForm";
import SectionWrapper from "../organisms/SectionWrapper";
import { useTranslations, useLocale } from "next-intl";

export default function AppointmentSection() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarRef = useRef<AppointmentCalendarRef>(null);
  const t = useTranslations("contactPage");
  const tC = useTranslations("appointment");
  const locale = useLocale();

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
        <SectionWrapper>
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16">
            {/* Calendar Section */}
            <div className="space-y-5 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <h3 className="font-poppins font-medium text-xl md:text-2xl text-black">
                  {tC("calendar.title")}
                </h3>
                <p className="font-inter text-sm text-black/60">
                  {tC("calendar.subTitle")}
                </p>
              </div>
              <AppointmentCalendar
                ref={calendarRef}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 md:p-6 lg:p-8 mt-6 md:mt-8 lg:mt-10">
                <h4 className="font-poppins font-medium text-lg md:text-xl text-black mb-3 md:mb-4">
                  {tC("information.title")}
                </h4>
                <ul className="space-y-3 md:space-y-4 font-inter text-sm md:text-base text-black/70">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{tC("information.point1")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{tC("information.point2")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{tC("information.point3")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{tC("information.point4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-poppins font-medium text-2xl text-black">
                  {tC("form.title")}
                </h3>
                <p className="font-inter text-sm text-black/60">
                  {tC("form.subTitle")}
                </p>
                {selectedDate && (
                  <p className="font-inter text-sm font-medium text-primary">
                    {tC("form.selected")}
                    {new Date(selectedDate).toLocaleDateString(
                      locale === "id" ? "id-ID" : "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
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
        </SectionWrapper>
      </div>
    </section>
  );
}
