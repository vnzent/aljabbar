"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    formData;
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
          <Button type="submit" variant="tertiary">
            Send a message
          </Button>
        </form>
      </div>
    </div>
  );
}
