

"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";
import { Devlopers } from "../components/developer";
import { MaskContainer } from "../components/ui/svg-mask-effect";
import { Testimonials } from "../components/testimonials";
import { NavbarDemo } from "../components/Navbar";
import Footer from "../components/Footer";

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default function Homepage() {

  return (
<div className="relative w-full  justify-center">
<NavbarDemo/>
<HeroParallax products={products} />

<MaskContainer
  className="bg-gradient-to-b from-black via-gray-900 to-gray-800"
  size={50}
  revealSize={600}
  revealText={
    <p className="mx-auto max-w-4xl text-center text-4xl md:text-5xl font-bold text-white px-4">
      We’re passionate about transforming audio into text quickly and accurately. <br />
      Our mission is to make transcription simple, secure, and accessible for all.
    </p>
  }
>
  <h1 className="text-center text-4xl md:text-6xl font-extrabold text-black px-4">
    Experience seamless <span className="text-blue-500">audio-to-text conversion</span> with cutting-edge technology and <span className="text-blue-500">multilingual support</span>.
  </h1>
</MaskContainer>


<Testimonials/>
<Footer/>
</div>
  );
}
