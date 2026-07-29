import React, { useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const SearchInput = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message: "Add your Supabase URL and anon key to .env first.",
      });
      return;
    }

    if (!email.trim()) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("subscribers").insert({
      email: email.trim().toLowerCase(),
    });
    setIsSubmitting(false);

    if (error) {
      const duplicateEmailCode = "23505";
      setStatus({
        type: "error",
        message:
          error.code === duplicateEmailCode
            ? "This email is already subscribed."
            : error.message,
      });
      return;
    }

    setEmail("");
    setStatus({
      type: "success",
      message: "Subscribed successfully. Thank you.",
    });
  };

  return (
    <form className="grid w-full max-w-md gap-3" onSubmit={handleSearchSubmit}>
      <div className="grid gap-3 sm:flex">
        <input
          className="w-full rounded-md border px-4 py-3 focus:outline-none focus:ring sm:rounded-l-md sm:rounded-r-none"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          value={email}
        />
        <button
          className="rounded-md bg-red-500 px-5 py-3 text-white transition duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400 sm:rounded-l-none sm:rounded-r-md"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Subscribe"}
        </button>
      </div>
      {status.message && (
        <p
          className={
            status.type === "success"
              ? "text-center text-sm text-green-700"
              : "text-center text-sm text-red-600"
          }
        >
          {status.message}
        </p>
      )}
    </form>
  );
};

export default SearchInput;
