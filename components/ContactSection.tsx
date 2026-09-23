"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contactCopy } from "@/lib/content";
import ThankYou from "@/components/ThankYou";
import type { ContactFormData, ContactFormErrors } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const initialData: ContactFormData = {
  name: "",
  phone: "",
  eventDate: "",
  location: "",
};

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Please share your name.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Please share a contact number.";
  } else if (!/^[0-9+()\-\s]{7,}$/.test(data.phone.trim())) {
    errors.phone = "That number doesn't look right.";
  }
  return errors;
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, required, error, children }: FieldProps) {
  return (
    <div className="w-full">
      <label className="block text-[0.68rem] font-medium tracking-[0.16em] text-ink/60">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="mt-2">{children}</div>
      <div className="mt-1.5 h-px w-full bg-ink/20 transition-colors duration-300 focus-within:bg-ink" />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-1.5 text-[0.72rem] font-light text-[#9c4a3a]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClasses =
  "w-full bg-transparent pb-1 text-[0.98rem] font-light text-ink placeholder:text-ink/35 focus:outline-none";

export default function ContactSection() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );

  const update = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="flex h-full w-full flex-col items-center justify-center bg-fog px-6 text-ink sm:px-10"
    >
      <div className="mx-auto w-full max-w-md">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="thanks"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThankYou />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="text-center">
                <h2 className="font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {contactCopy.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-[30ch] text-[0.85rem] font-light text-ink/65">
                  {contactCopy.subheading}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-10 flex flex-col gap-7"
              >
                <Field label="Name" required error={errors.name}>
                  <input
                    type="text"
                    value={data.name}
                    onChange={update("name")}
                    className={inputClasses}
                    autoComplete="name"
                  />
                </Field>

                <Field label="Contact Number" required error={errors.phone}>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={update("phone")}
                    className={inputClasses}
                    autoComplete="tel"
                  />
                </Field>

                <Field label="Expected Event Date">
                  <input
                    type="date"
                    value={data.eventDate}
                    onChange={update("eventDate")}
                    className={`${inputClasses} [color-scheme:light]`}
                  />
                </Field>

                <Field label="Location">
                  <input
                    type="text"
                    value={data.location}
                    onChange={update("location")}
                    className={inputClasses}
                    autoComplete="address-level2"
                  />
                </Field>

                {status === "error" && (
                  <p className="text-center text-[0.78rem] font-light text-[#9c4a3a]">
                    We couldn&apos;t send your inquiry. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-3 w-full border border-ink py-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper disabled:opacity-50"
                >
                  {status === "submitting" ? "SENDING\u2026" : "SUBMIT"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
