"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactSection")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          time: formData.subject,
          note: formData.note,
          to_email: "vincent.ptk17@gmail.com", // Your receiving email
        },
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          message: t("contactForm.submittedText"),
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          note: "",
        });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          t("contactForm.failed"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-2xl bg-primary p-6 sm:p-8 md:p-12">
      <div className="flex flex-col gap-4 md:gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2 className="font-poppins text-3xl sm:text-4xl font-medium text-white">
            {t("contactForm.header")}
          </h2>
          <p className="font-poppins text-base sm:text-lg text-white/90">
            {t("contactForm.subHeader")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder={t("contactForm.input1")}
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-base md:text-lg"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              placeholder={t("contactForm.input2")}
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-base md:text-lg"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="subject"
              placeholder={t("contactForm.input3")}
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-base md:text-lg"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <textarea
              name="note"
              placeholder={t("contactForm.input4")}
              value={formData.note}
              onChange={handleChange}
              required
              rows={5}
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-base md:text-lg resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="tertiary"
            disabled={isSubmitting}
            className="w-full md:w-auto uppercase "
          >
            {isSubmitting ? t("contactForm.isSubmitting") : t("contactForm.Cta")}
          </Button>

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
      </div>
    </div>
  );
}
