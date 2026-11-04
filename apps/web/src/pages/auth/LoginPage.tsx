import React, { useState } from "react";
import { ArrowRight, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import spbu from "@/assets/Pertamina Station at Twilight.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("auth/signin", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/");
    } catch (err) {
      console.error("Login gagal:", err);
      setError("Username atau password salah. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0E2237]">
      {/* Full-screen background */}
      <img
        src={spbu}
        alt="SPBU saat senja"
        className="fixed inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-[#0E2237]/35" />

      {/* Login form */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:justify-end sm:px-10 lg:px-20">
        <section className="w-full max-w-md rounded-2xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[#10243A] sm:text-3xl">
              SPBU Puri Beta
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitoring & Accounting System
            </p>

            {/* <p className="mt-6 text-left text-sm leading-6 text-slate-500">
              Silakan masuk menggunakan akun Anda untuk melanjutkan ke sistem
              monitoring SPBU.
            </p> */}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-[#10243A]"
              >
                Username
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15">
                <User size={19} className="shrink-0 text-slate-400" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#10243A]"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15">
                <Lock size={19} className="shrink-0 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#EF2026] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D91D22] focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memproses..." : "Masuk"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">SPBU Monitoring</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
        </section>
      </div>
    </main>
  );
}
