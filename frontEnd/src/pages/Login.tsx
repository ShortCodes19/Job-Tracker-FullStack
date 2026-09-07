import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "@/services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await loginUser(email, password);
      navigate("/jobs");
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        setError(requestError.response?.data?.message ?? "Unable to log in");
      } else {
        setError("Unable to log in");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:grid-cols-[1fr_1.1fr]">
          <div className="hidden bg-cyan-950 p-10 md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Job Tracker
              </p>
              <h1 className="mt-12 text-4xl font-bold leading-tight text-white">
                Keep every opportunity moving forward.
              </h1>
            </div>
            <p className="max-w-xs text-sm leading-6 text-cyan-100/70">
              Sign in to see your applications and stay ready for the next
              conversation.
            </p>
          </div>

          <div className="p-7 sm:p-10">
            <Link to="/" className="text-sm text-slate-400 hover:text-white">
              Back to home
            </Link>
            <h2 className="mt-10 text-3xl font-bold text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to access your job tracker.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-slate-300">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>
              <label className="block text-sm font-medium text-slate-300">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              {error && (
                <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-400">
              New here?{" "}
              <Link
                to="/register"
                className="font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
