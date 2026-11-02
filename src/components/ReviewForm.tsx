"use client";

import { useState, type FormEvent } from "react";
import { ApiError, ValidationError, apiFetch } from "@/lib/api";
import type { ReviewPayload } from "@/types/api";
import form from "./Form.module.css";

const RATINGS = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

export default function ReviewForm({ productId }: { productId: number }) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rating = String(data.get("rating") ?? "");
    const text = String(data.get("message") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!rating && !text) {
      setErrors({ message: ["Add a rating or write a few words."] });
      return;
    }

    const payload: ReviewPayload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      ...(phone && { phone }),
      ...(rating && { rating: Number(rating) }),
      ...(text && { message: text }),
    };

    setPending(true);
    setErrors({});
    setMessage(null);
    try {
      await apiFetch(`products/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setDone(true);
    } catch (error) {
      if (error instanceof ValidationError) setErrors(error.errors);
      setMessage(error instanceof ApiError ? error.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className={`${form.status} ${form.success}`} role="status">
        Thank you. Your review has been submitted and will appear shortly.
      </p>
    );
  }

  const fieldError = (name: string) =>
    errors[name]?.[0] && <span className={form.error}>{errors[name][0]}</span>;

  return (
    <form className={form.form} onSubmit={handleSubmit} noValidate>
      <div className={form.row}>
        <label className={form.field}>
          <span className={form.label}>Name</span>
          <input className={form.input} name="name" required autoComplete="name" />
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
          <input className={form.input} name="phone" maxLength={30} autoComplete="tel" />
          {fieldError("phone")}
        </label>
        <label className={form.field}>
          <span className={form.label}>Rating</span>
          <select className={form.input} name="rating" defaultValue="">
            <option value="">No rating</option>
            {RATINGS.map((value) => (
              <option key={value} value={value}>
                {value} out of 5
              </option>
            ))}
          </select>
          {fieldError("rating")}
        </label>
      </div>
      <label className={form.field}>
        <span className={form.label}>Your review</span>
        <textarea className={form.input} name="message" maxLength={5000} />
        {fieldError("message")}
      </label>

      {message && (
        <p className={`${form.status} ${form.failure}`} role="alert">
          {message}
        </p>
      )}
      <button type="submit" className={form.submit} disabled={pending}>
        {pending ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
