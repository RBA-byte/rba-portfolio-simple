"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionBackdrop from "@/components/SectionBackdrop";
import ThankYou from "@/components/ThankYou";
import { contactCopy, weddingPackages } from "@/lib/content";
import type { ContactFormData, ContactFormErrors, ResponsiveImage } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const initialData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  location: "",
};

function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.trim().replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("0")) return `+92${cleaned.slice(1)}`;
  if (cleaned.startsWith("92")) return `+${cleaned}`;

  return cleaned;
}

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

  if (
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.email = "That email doesn't look right.";
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
  const id = useId();
  return (
    <div className="w-full">
            <label htmlFor={id} className="block text-[0.68rem] font-medium tracking-[0.16em] text-paper/65">
        {label}
        {required ? " *" : ""}
      </label>
            <div className="mt-2">
        {isValidElement(children)
          ? cloneElement(children as ReactElement<{ id?: string }>, { id })
          : children}
      </div>
      <div className="mt-1.5 h-px w-full bg-paper/25 transition-colors duration-300 focus-within:bg-paper" />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-1.5 text-[0.72rem] font-light text-[#f0a893]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Re-enable the page's scroll snapping after the keyboard-open lock. */
function releaseStoryLock() {
  const story = document.querySelector<HTMLElement>(".scroll-story");
  if (!story) return;
  story.classList.remove("keyboard-open");
  story.style.height = "";
}

const inputClasses =
  "w-full appearance-none bg-transparent pb-1 text-[0.98rem] font-light text-paper placeholder:text-paper/35 focus:outline-none [-webkit-appearance:none] [box-shadow:none]";

export default function ContactSection({
  image,
  selectedPackage,
  onPackageChange,
}: {
  image: ResponsiveImage;
  selectedPackage: string;
  onPackageChange: (packageName: string) => void;
}) {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

    const sectionRef = useRef<HTMLElement>(null);

  // Mobile keyboard fix: pause snapping and pin the scroller's height while
  // a field is focused; restore both as soon as the keyboard closes.
  useEffect(() => {
    const section = sectionRef.current;
    const story = document.querySelector<HTMLElement>(".scroll-story");
    if (!section || !story) return;
    const vv = window.visualViewport;
    let baseline = 0;
    let shrunk = false;

    const isField = (t: EventTarget | null) =>
      t instanceof HTMLInputElement ||
      t instanceof HTMLTextAreaElement ||
      t instanceof HTMLSelectElement;

    const lock = () => {
      if (story.classList.contains("keyboard-open")) return;
      baseline = window.innerHeight;
      shrunk = false;
      story.style.height = `${story.offsetHeight}px`;
      story.classList.add("keyboard-open");
    };
    const onFocusIn = (e: FocusEvent) => {
      if (isField(e.target)) lock();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!isField(e.relatedTarget)) releaseStoryLock();
    };
    // Some phones close the keyboard without blurring the field.
    const onViewportResize = () => {
      if (!vv || !story.classList.contains("keyboard-open")) return;
      if (vv.height < baseline - 120) shrunk = true;
      else if (shrunk) releaseStoryLock();
    };

    section.addEventListener("focusin", onFocusIn);
    section.addEventListener("focusout", onFocusOut);
    vv?.addEventListener("resize", onViewportResize);
    window.addEventListener("pagehide", releaseStoryLock);
    return () => {
      section.removeEventListener("focusin", onFocusIn);
      section.removeEventListener("focusout", onFocusOut);
      vv?.removeEventListener("resize", onViewportResize);
      window.removeEventListener("pagehide", releaseStoryLock);
      releaseStoryLock();
    };
  }, []);

  // Submitting removes the focused field without a blur event, so release
  // the lock explicitly.
  useEffect(() => {
    if (status === "submitting" || status === "sent") releaseStoryLock();
  }, [status]);

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
        body: JSON.stringify({ ...data, packageName: selectedPackage }),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(body?.error || "Request failed.");
      }

      const normalizedEmail = data.email.trim().toLowerCase();
const normalizedPhone = normalizePhoneNumber(data.phone);

const userData: {
  email?: string;
  phone_number?: string;
} = {};

if (normalizedEmail) {
  userData.email = normalizedEmail;
}

if (normalizedPhone) {
  userData.phone_number = normalizedPhone;
}

window.gtag?.("set", "user_data", userData);

window.gtag?.("event", "conversion", {
  send_to: "AW-18460277173/D5nzCLSjlIUdELXzxeJE",
});

setStatus("sent");
      
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
      <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[100dvh] w-full overflow-hidden text-paper"
    >
      <SectionBackdrop image={image} />

      {/* Scrolling happens in this inner layer so the backdrop stays pinned */}
      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center  px-6 sm:px-10">

      <div className="relative z-10 my-auto w-full max-w-md py-16">
        <div
          className="rounded-sm border border-paper/10 px-6 py-9 sm:px-10 sm:py-12"
          style={{
            background: "rgba(19,18,16,0.42)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
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
                  <h2 className="font-display text-2xl leading-snug sm:text-3xl">
                    {contactCopy.heading}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[30ch] text-[0.85rem] font-light text-paper/70">
                    {contactCopy.subheading}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-10 flex flex-col gap-7"
                >
                  <fieldset className="w-full">
                    <legend className="block text-[0.68rem] font-medium tracking-[0.16em] text-paper/65">
                      Package
                    </legend>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {weddingPackages.map((pkg) => (
                        <label
                          key={pkg.name}
                          className="flex cursor-pointer items-center gap-2 text-[0.88rem] font-light text-paper"
                        >
                          <input
                            type="radio"
                            name="package"
                            value={pkg.name}
                            checked={selectedPackage === pkg.name}
                            onChange={() => onPackageChange(pkg.name)}
                            className="peer sr-only"
                          />
                          <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full border border-paper/60 transition-colors duration-300 peer-checked:border-paper peer-checked:bg-paper peer-focus-visible:ring-1 peer-focus-visible:ring-paper peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink/50" />
                          {pkg.name}
                        </label>
                      ))}
                    </div>
                    <div className="mt-3 h-px w-full bg-paper/25" />
                  </fieldset>

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

                  <Field label="Email" error={errors.email}>
  <input
    type="email"
    value={data.email}
    onChange={update("email")}
    className={inputClasses}
    autoComplete="email"
    inputMode="email"
  />
</Field>

                  <Field label="Expected Event Date">
                    <input
                      type="date"
                      value={data.eventDate}
                      onChange={update("eventDate")}
                      className={`${inputClasses} [color-scheme:dark]`}
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
                    <p className="text-center text-[0.78rem] font-light text-[#f0a893]">
                      {errorMessage || "We couldn't send your inquiry. Please try again."}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-3 w-full border border-paper py-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-paper hover:text-ink disabled:opacity-50"
                  >
                    {status === "submitting" ? "SENDING\u2026" : "ENQUIRE"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
         </div>
    </section>
  );
}
