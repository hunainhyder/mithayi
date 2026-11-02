"use client";

import { useState, type FormEvent } from "react";
import { ApiError, ValidationError, apiFetch } from "@/lib/api";
import type { EnquiryPayload } from "@/types/api";
import form from "./Form.module.css";

export default function EnquiryForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const phone = field("phone");

    const payload: EnquiryPayload = {
      name: field("name"),
      email: field("email"),
      ...(phone && { phone }),
      subject: field("subject"),
      message: field("message"),
    };

    setPending(true);
    setMessage(null);
    setErrors({});
    try {
      await apiFetch("enquiries", { method: "POST", body: JSON.stringify(payload) });
      setDone(true);
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      setMessage(
        error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className={`${form.status} ${form.success}`} role="status">
        Thank you for getting in touch. We&rsquo;ll reply as soon as we can.
      </p>
    );
  }

  const fieldError = (name: string) =>
    errors[name]?.[0] && <span className={form.error}>{errors[name][0]}</span>;

  return (
    <form className={form.form} onSubmit={handleSubmit}>
      <div className={form.row}>
        <label className={form.field}>
          <span className={form.label}>Name</span>
          <input className={form.input} name="name" required maxLength={255} autoComplete="name" />
          {fieldError("name")}
        </label>
        <label className={form.field}>
          <span className={form.label}>Email</span>
          <input className={form.input} type="email" name="email" required autoComplete="email" />
          {fieldError("email")}
        </label>
      </div>
      <div className={form.row}>
        <label className={form.field}>
          <span className={form.label}>Phone (optional)</span>
          <input className={form.input} type="tel" name="phone" maxLength={30} autoComplete="tel" />
          {fieldError("phone")}
        </label>
        <label className={form.field}>
          <span className={form.label}>Subject</span>
          <input className={form.input} name="subject" required maxLength={255} />
          {fieldError("subject")}
        </label>
      </div>
      <label className={form.field}>
        <span className={form.label}>Message</span>
        <textarea className={form.input} name="message" required maxLength={10000} />
        {fieldError("message")}
      </label>

      {message && (
        <p className={`${form.status} ${form.failure}`} role="alert">
          {message}
        </p>
      )}
      <button type="submit" className={form.submit} disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
