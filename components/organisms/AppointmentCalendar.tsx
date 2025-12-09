"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import type { DateAvailability } from "@/lib/types/appointment";
import { cn } from "@/lib/utils";

interface AppointmentCalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

export interface AppointmentCalendarRef {
  refetch: () => void;
}

const AppointmentCalendar = forwardRef<
  AppointmentCalendarRef,
  AppointmentCalendarProps
>(({ onDateSelect, selectedDate }, ref) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(
    new Date(new Date().setMonth(new Date().getMonth() + 1))
  );
  const [availability, setAvailability] = useState<
    Map<string, DateAvailability>
  >(new Map());
  const [loading, setLoading] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const nextMonthStart = startOfMonth(nextMonth);
  const nextMonthEnd = endOfMonth(nextMonth);

  const currentDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const nextDays = eachDayOfInterval({
    start: nextMonthStart,
    end: nextMonthEnd,
  });

  useEffect(() => {
    fetchAvailability();
  }, [currentMonth]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const startDate = format(monthStart, "yyyy-MM-dd");
      const endDate = format(nextMonthEnd, "yyyy-MM-dd");

      const response = await fetch(
        `/api/appointments/availability?startDate=${startDate}&endDate=${endDate}&t=${Date.now()}`,
        { cache: "no-store" }
      );
      const result = await response.json();

      if (result.success && result.data) {
        const availMap = new Map<string, DateAvailability>();
        result.data.forEach((item: DateAvailability) => {
          availMap.set(item.date, item);
        });

        setAvailability(availMap);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  // Expose refetch method to parent
  useImperativeHandle(ref, () => ({
    refetch: fetchAvailability,
  }));

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);

    const nextPrev = new Date(nextMonth);
    nextPrev.setMonth(nextPrev.getMonth() - 1);
    setNextMonth(nextPrev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);

    const nextNext = new Date(nextMonth);
    nextNext.setMonth(nextNext.getMonth() + 1);
    setNextMonth(nextNext);
  };

  const getDateStatus = (date: Date): DateAvailability["status"] | null => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availability.get(dateStr)?.status || "available";
  };

  const getStatusColor = (
    status: DateAvailability["status"] | null,
    isSelected: boolean
  ) => {
    if (isSelected) return "bg-primary text-white";

    switch (status) {
      case "booked":
        return "bg-blue-900 text-white cursor-not-allowed";
      case "partially-booked":
        return "bg-blue-100 text-blue-900 cursor-pointer hover:bg-blue-200";
      case "available":
        return "bg-white text-black cursor-pointer hover:bg-blue-50";
      default:
        return "bg-white text-black cursor-pointer hover:bg-blue-50";
    }
  };

  const renderCalendar = (days: Date[], month: Date) => {
    const firstDayOfMonth = days[0].getDay();
    const emptyCells = Array(firstDayOfMonth).fill(null);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-medium text-lg">
            {format(month, "MMMM yyyy")}
          </h3>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const status = getDateStatus(day);
            const isSelected = selectedDate === dateStr;
            const isPast = isBefore(day, startOfDay(new Date()));
            const isDisabled = isPast || status === "booked";

            return (
              <button
                key={dateStr}
                onClick={() => !isDisabled && onDateSelect(dateStr)}
                disabled={isDisabled}
                className={cn(
                  "aspect-square rounded-md text-sm font-inter flex items-center justify-center transition-colors relative",
                  getStatusColor(status, isSelected),
                  isPast && "opacity-40 cursor-not-allowed",
                  isToday(day) &&
                    !isSelected &&
                    "ring-2 ring-primary ring-offset-1"
                )}
              >
                {format(day, "d")}
                {status === "partially-booked" && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Previous month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Next month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {renderCalendar(currentDays, currentMonth)}
        {renderCalendar(nextDays, nextMonth)}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm font-inter">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-900 rounded" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded relative">
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
          </div>
          <span>Partially booked</span>
        </div>
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-500 py-4">
          Loading availability...
        </div>
      )}
    </div>
  );
});

AppointmentCalendar.displayName = "AppointmentCalendar";

export default AppointmentCalendar;
