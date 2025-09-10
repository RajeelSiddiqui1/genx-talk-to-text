"use client";
import React from "react";
import { WobbleCard } from "../components/ui/wobble-card";
import { BackgroundLines } from "../components/ui/background-lines";
import { Devlopers } from "../components/developer";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";

export default function Aboutpage() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <NavbarDemo/>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          About Us <br /> Your Trusted Audio-to-Text Solution
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          We empower users to seamlessly convert audio to text with precision and ease. Learn more about our mission to make transcription accessible for everyone.
        </p>
      </BackgroundLines>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Our Mission: Simplify Transcription
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              We’re dedicated to providing fast, accurate, and user-friendly audio-to-text solutions for students, professionals, and creators worldwide.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="audio to text demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Secure & Organized History
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Your transcriptions are securely stored and easily accessible, organized by date and language for a seamless user experience.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] my-3">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Why Choose Us?
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Join thousands of users who trust our platform for secure, multilingual transcriptions. Sign up to manage your audio-to-text needs effortlessly.
            </p>
          </div>
          <img
            src="/linear.webp"
            width={500}
            height={500}
            alt="about us demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>

    <Devlopers/>
    <Footer/>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div className="w-full py-16 bg-gray-800 animate-pulse">
      <div className="max-w-4xl mx-auto h-40 bg-gray-700 rounded-lg" />
    </div>
  );
}