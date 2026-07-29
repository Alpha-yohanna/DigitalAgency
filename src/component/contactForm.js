import React, { useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message: "Add your Supabase URL and anon key to .env first.",
      });
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        message: "Please complete all fields before sending.",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setIsSubmitting(false);

    if (error) {
      setStatus({ type: "error", message: error.message });
      return;
    }

    setForm(initialForm);
    setStatus({
      type: "success",
      message: "Message sent. We will get back to you shortly.",
    });
  };

  return (
    <section id="contact" className="bg-white px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-green-600 text-sm font-medium uppercase text-left">
          contact us
        </p>
        <div className="mt-4 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="text-left">
            <h2 className="font-Poppins text-3xl font-bold text-black">
              Ready to grow your business?
            </h2>
            <p className="mt-4 text-gray-600">
              Send us a message and our team will reach out with the next best
              step for your brand.
            </p>
          </div>

          <form className="grid gap-4 text-left" onSubmit={handleSubmit}>
            <input
              className="rounded-md border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              type="text"
              value={form.name}
            />
            <input
              className="rounded-md border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              name="email"
              onChange={handleChange}
              placeholder="Email address"
              type="email"
              value={form.email}
            />
            <textarea
              className="min-h-[140px] rounded-md border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none"
              name="message"
              onChange={handleChange}
              placeholder="Tell us what you need"
              value={form.message}
            />
            <button
              className="rounded-md bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {status.message && (
              <p
                className={
                  status.type === "success" ? "text-green-700" : "text-red-600"
                }
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
