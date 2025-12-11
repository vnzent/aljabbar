"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { AppointmentFormData, TimeSlot } from "@/lib/types/appointment";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface AppointmentFormProps {
  selectedDate: string | null;
  onSuccess?: () => void;
  onRevalidate?: () => void;
}

export default function AppointmentForm({
  selectedDate,
  onSuccess,
  onRevalidate,
}: AppointmentFormProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = useTranslations("appointment");
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: "",
    email: "",
    phone: "",
    bookingType: "",
    location: "",
    address: "",
    selectedDate: "",
    selectedTimeSlot: "",
    note: "",
  });

  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, selectedDate }));
      fetchTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchTimeSlots = async (date: string) => {
    setLoadingSlots(true);
    try {
      const response = await fetch(`/api/appointments/timeslots?date=${date}`);
      const result = await response.json();
      if (result.success && result.data) {
        setTimeSlots(result.data);
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotSelect = (slotId: string) => {
    setFormData((prev) => ({ ...prev, selectedTimeSlot: slotId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Get the actual text from the select options
    const bookingTypeElement = document.getElementById(
      "bookingType"
    ) as HTMLSelectElement;
    const locationElement = document.getElementById(
      "location"
    ) as HTMLSelectElement;

    const bookingTypeText =
      bookingTypeElement?.options[bookingTypeElement.selectedIndex]?.text ||
      formData.bookingType;
    const locationText =
      locationElement?.options[locationElement.selectedIndex]?.text ||
      formData.location;

    const submitData = {
      ...formData,
      bookingType: bookingTypeText,
      location: locationText,
      selectedTimeSlot: formData.selectedTimeSlot, // Send slot ID (slot1, slot2, etc)
    };

    console.log(submitData);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: t("form.successfullyBooked"),
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          bookingType: "",
          location: "",
          address: "",
          selectedDate: "",
          selectedTimeSlot: "",
          note: "",
        });
        // Revalidate timeslots and calendar after booking
        if (selectedDate) {
          await fetchTimeSlots(selectedDate);
        }
        onRevalidate?.();
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || t("form.failed"),
        });
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setSubmitStatus({
        type: "error",
        message: t("form.failed"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.bookingType &&
    formData.location &&
    formData.selectedDate &&
    formData.selectedTimeSlot;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-3">
          <label className="block font-poppins font-medium text-black">
            {t("form.time")}
          </label>
          {loadingSlots ? (
            <p className="text-sm text-gray-500">{t("form.loading")}</p>
          ) : timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() =>
                    slot.isAvailable && handleTimeSlotSelect(slot.id)
                  }
                  disabled={!slot.isAvailable}
                  className={cn(
                    "px-4 py-3 rounded-md text-sm font-inter border transition-colors",
                    formData.selectedTimeSlot === slot.id
                      ? "bg-primary text-white border-primary"
                      : slot.isAvailable
                      ? "bg-white text-black border-gray-300 hover:border-primary"
                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  )}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">{t("form.unavailable")}</p>
          )}
        </div>
      )}

      {/* First Name */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block font-poppins font-medium text-black"
        >
          {t("form.input1")}
        </label>
        <input
          type="text"
          id="name"
          name={t("form.input1")}
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block font-poppins font-medium text-black"
          >
            {t("form.input2")}
          </label>
          <input
            type="email"
            id="email"
            name={t("form.input2")}
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block font-poppins font-medium text-black"
          >
            {t("form.input3")}
          </label>
          <input
            type="tel"
            id="phone"
            name={t("form.input3")}
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter"
          />
        </div>
      </div>

      {/* Booking Type */}
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <label
            htmlFor="booktingType"
            className="block font-poppins font-medium text-black"
          >
            {t("form.input4.name")}
          </label>
          <div className="relative">
            <select
              id="bookingType"
              name={t("form.input4.name")}
              value={formData.bookingType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter appearance-none bg-white cursor-pointer"
            >
              <option value="">{t("form.input4.option1")}</option>
              <option value="consultation">{t("form.input4.option2")}</option>
              <option value="viewing">{t("form.input4.option3")}</option>
              <option value="home-visit">{t("form.input4.option4")}</option>
              <option value="repair">{t("form.input4.option5")}</option>
              <option value="cleaning">{t("form.input4.option6")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block font-poppins font-medium text-black"
          >
            {t("form.input5")}
          </label>
          <div className="relative">
            <select
              id="location"
              name={t("form.input5")}
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter appearance-none bg-white cursor-pointer"
            >
              <option value="">Choose Place</option>
              <option value="kemang">Al-Jabbar Kemang</option>
              <option value="nosherwan">Nosherwan Carpets</option>
              <option value="benda">Al Kabir Carpet</option>
              <option value="bekasi">Al-Jabbar Bekasi</option>
              <option value="surabaya-muhammad">
                Al-Jabbar Surabaya (H. Muhammad)
              </option>
              <option value="surabaya-kertajaya">
                Al-Jabbar Surabaya (Kertajaya)
              </option>
              <option value="banten">Al Matah Carpets</option>
              <option value="garut">Al Jabbar Garut</option>
              <option value="tasikmalaya">Al Jabbar Tasikmalaya</option>
              <option value="gorontalo">Al-Jabbar Gorontalo</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label
          htmlFor="address"
          className="block font-poppins font-medium text-black"
        >
          {t("form.input6")}
        </label>
        <textarea
          id="address"
          name={t("form.input6")}
          value={formData.address}
          onChange={handleInputChange}
          required
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter resize-none"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label
          htmlFor="notes"
          className="block font-poppins font-medium text-black"
        >
          {t("form.input7.name")}
        </label>
        <textarea
          id="notes"
          name={t("form.input7.name")}
          value={formData.note}
          onChange={handleInputChange}
          rows={3}
          placeholder={t("form.input7.placeholder")}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid || submitting}
        className="w-full text-lg font-poppins font-normal uppercase border hover:border-primary"
      >
        {submitting ? t("form.isSubmitting") : t("form.Cta")}
      </Button>

      {!selectedDate && (
        <p className="text-sm text-red-600 text-center">
          {t("form.notSelected")}
        </p>
      )}

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 border-2 ${
            submitStatus.type === "success"
              ? "bg-green-50 border-green-500 text-green-700"
              : "bg-red-50 border-red-500 text-red-700"
          }`}
        >
          <p className="font-poppins text-sm">{submitStatus.message}</p>
        </div>
      )}
    </form>
  );
}
