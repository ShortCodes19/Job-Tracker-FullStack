import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "@/services/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(inputs.name, inputs.email, inputs.password);
      navigate("/login");
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        setError(
          requestError.response?.data?.message ?? "Failed to register user",
        );
      } else {
        setError("Failed to register user");
      }
    }
  };
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl sm:p-10"
        >
          <Link to="/" className="text-sm text-slate-400 hover:text-white">
            Back to home
          </Link>
          <h1 className="mt-10 text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Start organizing your applications today.
          </p>

          {error && (
            <p className="mt-6 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <div className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-300">
              Name
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Email
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Create account
          </button>
          <p className="mt-7 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
