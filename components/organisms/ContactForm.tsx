"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
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
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.fullName,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "vincent.ptk17@gmail.com", // Your receiving email
        },
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or contact us directly.",
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
    <div className="w-full max-w-2xl bg-primary p-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2 className="font-poppins text-4xl font-medium text-white">
            Get in Touch
          </h2>
          <p className="font-poppins text-lg text-white/90">
            We are glad to invite you to our carpet showroom
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-lg"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-lg"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-lg"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-transparent border-b-2 border-white/40 text-white placeholder:text-white py-3 px-0 focus:outline-none focus:border-white transition-colors font-poppins text-lg resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="tertiary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send a message"}
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
