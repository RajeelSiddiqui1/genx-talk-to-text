"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/lib/utils";
import Snackbar from "@mui/joy/Snackbar";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SignupFormDemo() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackColor, setSnackColor] = useState("success"); // "success" | "danger"

  const handleClose = () => setSnackOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/auth/register", {
        firstname,
        lastname,
        email,
        password,
      });
      if (res) {
        setSnackMsg("Register successfully ✅");
        setSnackColor("success");
        setSnackOpen(true);
        setTimeout(() => router.push("/login"), 1500); // small delay before redirect
      }
    } catch (error) {
      setSnackMsg("Register failed ❌");
      setSnackColor("danger");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-gray-800 bg-gradient-to-b from-black to-gray-600 p-4 shadow-lg md:rounded-2xl md:p-8">
      <h2 className="text-xl text-center font-bold text-neutral-200">Register</h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-neutral-200">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-800 text-neutral-200 border-gray-800"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-neutral-200">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-800 text-neutral-200 border-gray-800"
            />
          </LabelInputContainer>
        </div>
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
          {loading ? "Loading..." : "Sign up →"}
          <BottomGradient />
        </button>
        <p className="mt-4 text-center text-sm text-neutral-300">
          Do you have an account?{" "}
          <a href="/login" className="hover:underline">
            Login
          </a>
        </p>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        onClose={handleClose}
        color={snackColor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
      >
        {snackMsg}
      </Snackbar>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-600 flex items-center justify-center">
      <SignupFormDemo />
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
