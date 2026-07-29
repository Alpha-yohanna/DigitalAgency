import React, { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const AdminDashboard = () => {
  const homeUrl = process.env.PUBLIC_URL || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const loadDashboardData = async () => {
    setIsLoading(true);
    const [subscriberResult, messageResult] = await Promise.all([
      supabase
        .from("subscribers")
        .select("id,email,created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("contact_messages")
        .select("id,name,email,message,created_at")
        .order("created_at", { ascending: false }),
    ]);
    setIsLoading(false);

    if (subscriberResult.error || messageResult.error) {
      const missingEmailColumn =
        messageResult.error?.message?.includes("contact_messages.email") ||
        messageResult.error?.message?.includes("email does not exist");

      setStatus({
        type: "error",
        message:
          missingEmailColumn
            ? "Your contact_messages table is missing the email column. Run supabase-fix-contact-messages.sql in Supabase SQL Editor."
            : subscriberResult.error?.message ||
              messageResult.error?.message ||
          "Unable to load dashboard data.",
      });
      return;
    }

    setSubscribers(subscriberResult.data || []);
    setMessages(messageResult.data || []);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadDashboardData();
    }
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!isSupabaseConfigured) {
      setStatus({
        type: "error",
        message: "Add your Supabase URL and anon key to .env first.",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setIsLoading(false);

    if (error) {
      setStatus({
        type: "error",
        message:
          error.message === "Invalid login credentials"
            ? "Invalid admin email or password. Confirm the user in Supabase Auth or reset the password there."
            : error.message,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSubscribers([]);
    setMessages([]);
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-sm">
          <a className="text-sm font-semibold text-green-700" href={homeUrl}>
            Back to website
          </a>
          <h1 className="mt-6 text-3xl font-bold text-gray-950">
            Admin Login
          </h1>
          <form className="mt-8 grid gap-4" onSubmit={handleLogin}>
            <input
              className="rounded-md border border-gray-300 px-4 py-3"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              type="email"
              value={email}
            />
            <input
              className="rounded-md border border-gray-300 px-4 py-3"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <button
              className="rounded-md bg-green-600 px-5 py-3 font-semibold text-white disabled:bg-gray-400"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {status.message && (
            <p className="mt-4 text-sm text-red-600">{status.message}</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <a className="text-sm font-semibold text-green-700" href={homeUrl}>
              Back to website
            </a>
            <h1 className="mt-3 text-3xl font-bold text-gray-950">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              className="rounded-md border border-green-600 px-4 py-2 font-semibold text-green-700"
              onClick={loadDashboardData}
              type="button"
            >
              Refresh
            </button>
            <button
              className="rounded-md bg-gray-900 px-4 py-2 font-semibold text-white"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>

        {status.message && (
          <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-red-700">
            {status.message}
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">
              Subscribers ({subscribers.length})
            </h2>
            <div className="mt-5 space-y-3">
              {subscribers.map((subscriber) => (
                <div
                  className="rounded-md border border-gray-200 p-4"
                  key={subscriber.id}
                >
                  <p className="font-semibold text-gray-950">
                    {subscriber.email}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(subscriber.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {!isLoading && subscribers.length === 0 && (
                <p className="text-gray-500">No subscribers yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">
              Messages ({messages.length})
            </h2>
            <div className="mt-5 space-y-3">
              {messages.map((message) => (
                <div
                  className="rounded-md border border-gray-200 p-4"
                  key={message.id}
                >
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="font-semibold text-gray-950">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-green-700">
                    {message.email}
                  </p>
                  <p className="mt-3 text-gray-700">{message.message}</p>
                </div>
              ))}
              {!isLoading && messages.length === 0 && (
                <p className="text-gray-500">No messages yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
