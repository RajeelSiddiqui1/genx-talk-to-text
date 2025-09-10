"use client";
import React from "react";
import { Spotlight } from "../components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { LampContainer } from "../components/ui/lamp";
import { MaskContainer } from "../components/ui/svg-mask-effect";
import { Boxes } from "../components/ui/background-boxes";
import { Devlopers } from "../components/developer"

export default function Aboutpage() {
  return (
    <>
      <div className="relative flex h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="green"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 text-center md:pt-0">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-7xl">
            Upload Your Audio <br /> Get Instant Transcript
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-normal text-neutral-300 md:text-lg">
            Easily upload your audio files and get accurate transcripts. <br />
            Change the language according to your preference with one click.
          </p>

          {/* Get Started Button */}
          <div className="mt-8 flex justify-center">
            <button
              className={cn(
                "group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-neutral-700 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500 hover:text-black"
              )}
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-cyan-500/20 to-indigo-600/20 opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>
      </div>

      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Build lamps <br /> the right way
        </motion.h1>
      </LampContainer>

      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-white">
            The first rule of MRR Club is you do not talk about MRR Club. <br />
            The second rule of MRR Club is you DO NOT talk about MRR Club.
          </p>
        }
      >
        Discover the power of{" "}
        <span className="text-blue-500">Tailwind CSS v4</span> with native CSS
        variables and container queries with{" "}
        <span className="text-blue-500">advanced animations</span>.
      </MaskContainer>

        <Devlopers />
   

    </>
  );
}
