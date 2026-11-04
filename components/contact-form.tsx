"use client";

import { useState } from "react";
import { BUSINESSES } from "@/data/businesses";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessInterest: string;
  subject: string;
  message: string;
  agreed: boolean;
}

const INITIAL: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessInterest: "",
  subject: "",
  message: "",
  agreed: false,
};

export function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      next.email = "A valid email address is required.";
    if (!form.subject.trim()) next.subject = "A subject is required.";
    if (!form.message.trim() || form.message.trim().length < 20)
      next.message = "Please write at least 20 characters.";
    if (!form.agreed) next.agreed = "You must agree to be contacted.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="contact-success" role="status">
        <h3>Form completed.</h3>
        <p>
          This form is front-end only. No backend or email service is connected, so your
          enquiry has not been sent. Please use the email addresses or phone numbers listed
          on this page to make your enquiry directly.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="cf-row">
        <label className="cf-field">
          <span>Name *</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="cf-error">{errors.name}</span>}
        </label>
        <label className="cf-field">
          <span>Email *</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="cf-error">{errors.email}</span>}
        </label>
      </div>

      <div className="cf-row">
        <label className="cf-field">
          <span>Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
        <label className="cf-field">
          <span>Company</span>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </label>
      </div>

      <div className="cf-row">
        <label className="cf-field">
          <span>Business of interest</span>
          <select
            value={form.businessInterest}
            onChange={(e) => setForm({ ...form, businessInterest: e.target.value })}
          >
            <option value="">Select a business</option>
            {BUSINESSES.map((business) => (
              <option key={business.slug} value={business.slug} disabled={business.publicationStatus === "pending"}>
                {business.legalName ?? business.slug}
              </option>
            ))}
          </select>
        </label>
        <label className="cf-field">
          <span>Subject *</span>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <span className="cf-error">{errors.subject}</span>}
        </label>
      </div>

      <label className="cf-field cf-full">
        <span>Message *</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="cf-error">{errors.message}</span>}
      </label>

      <label className="cf-check">
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
        />
        <span>I agree to be contacted about my enquiry.</span>
        {errors.agreed && <span className="cf-error">{errors.agreed}</span>}
      </label>

      <button type="submit" className="primary-button">
        Send enquiry <span>↗</span>
      </button>
    </form>
  );
}
