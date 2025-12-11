"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
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
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
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
      <Field id="firstName" label={t("form.input1")}>
        <Input
          id="firstName"
          name={t("form.input1")}
          value={formData.name}
          onChange={handleInputChange as any}
          required
        />
      </Field>
      <div className="grid grid-cols-2 gap-5">
        {/* Email */}
        <Field id="email" label={t("form.input2")}>
          <Input
            type="email"
            id="email"
            name={t("form.input2")}
            value={formData.email}
            onChange={handleInputChange as any}
            required
          />
        </Field>

        {/* Phone */}
        <Field id="phone" label={t("form.input3")}>
          <Input
            type="tel"
            id="phone"
            name={t("form.input3")}
            value={formData.phone}
            onChange={handleInputChange as any}
            required
          />
        </Field>
      </div>

      {/* Booking Type */}
      <div className="grid grid-cols-2 gap-2 md:gap-5">
        <Field id="bookingType" label={t("form.input4.name")}>
          <SelectField
            id="bookingType"
            name={t("form.input4.name")}
            value={formData.bookingType}
            onChange={handleInputChange as any}
            required
          >
            <option value="">{t("form.input4.option1")}</option>
              <option value="consultation">{t("form.input4.option2")}</option>
              <option value="viewing">{t("form.input4.option3")}</option>
              <option value="home-visit">{t("form.input4.option4")}</option>
              <option value="repair">{t("form.input4.option5")}</option>
              <option value="cleaning">{t("form.input4.option6")}</option>
          </SelectField>
        </Field>

        {/* Location */}
        <Field id="location" label={t("form.input5")}>
          <SelectField
            id="location"
            name={t("form.input5")}
            value={formData.location}
            onChange={handleInputChange as any}
            required
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
          </SelectField>
        </Field>
      </div>

      {/* Address */}
      <Field id="address" label="Address*">
        <Textarea
          id="address"
          name={t("form.input6")}
          value={formData.address}
          onChange={handleInputChange as any}
          required
          rows={3}
        />
      </Field>

      {/* Notes */}
      <Field id="notes" label={t("form.input7.name")}>
        <Textarea
          id="notes"
          name={t("form.input7.name")}
          value={formData.note}
          onChange={handleInputChange as any}
          rows={3}
          placeholder={t("form.input7.placeholder")}
        />
      </Field>

      {/* Submit Button */}
      <div className="space-y-3">
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
      </div>

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

function Field({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5 md:space-y-2">
      <label htmlFor={id} className="block font-poppins font-medium text-black">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  id,
  type = "text",
  name,
  value,
  onChange,
  required,
  placeholder,
  className,
}: {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className={
        className ||
        "w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter"
      }
    />
  );
}

function SelectField({
  id,
  name,
  value,
  onChange,
  required,
  children,
  className,
}: {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={
          className ||
          "w-full px-2 py-2 md:px-4 md:py-3 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter appearance-none bg-white cursor-pointer"
        }
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3">
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
  );
}

function Textarea({
  id,
  name,
  value,
  onChange,
  required,
  rows,
  placeholder,
  className,
}: {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      placeholder={placeholder}
      className={
        className ||
        "w-full px-2 py-2 md:px-4 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-inter resize-none"
      }
    />
  );
}
