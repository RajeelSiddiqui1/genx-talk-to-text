"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Snackbar from "@mui/joy/Snackbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export function LoginDemo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Snackbar state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        password,
      });
      if (res) {
        setMessage("Login successfully ✅");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => router.push("/home"), 1500); 
      }
    } catch (error) {
      setMessage("Login failed ❌");
      setSeverity("danger");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-gray-800 bg-gradient-to-b from-black to-gray-600 p-4 shadow-lg md:rounded-2xl md:p-8">
      <h2 className="text-xl text-center font-bold text-neutral-200">Login</h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-200">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-neutral-200 border-gray-800"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-neutral-200">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-neutral-200 border-gray-800"
          />
        </LabelInputContainer>
        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-b from-black to-gray-600 font-medium text-neutral-200 shadow-[0px_1px_0px_0px_#374151_inset,0px_-1px_0px_0px_#374151_inset]"
          type="submit"
        >
          {loading ? "Loading..." : "Login →"}
          <BottomGradient />
        </button>
        <p className="mt-4 text-center text-sm text-neutral-300">
          Don't have an account?{" "}
          <a href="/register" className="hover:underline">
            Register
          </a>
        </p>
      </form>

      {/* ✅ Snackbar notification */}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        color={severity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {message}
      </Snackbar>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-600 flex items-center justify-center">
      <LoginDemo />
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
