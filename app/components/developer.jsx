"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";

const developers = [

  {
    title: "Muhammad Rajeel Siddiqui",
    description: (
      <>
        <p>AI & Full Stack developer</p>
        <p>Email: <a href="mailto:rajeelsiddiqui3@gmail.com" className="underline">rajeelsiddiqui3@gmail.com</a></p>
        <p>LinkedIn: <a href="hhttps://www.linkedin.com/in/rajeel-siddiqui-60532529b/" target="_blank" className="underline">Profile</a></p>
        <p>GitHub: <a href="https://github.com/RajeelSiddiqui1/" target="_blank" className="underline">Profile</a></p>
        <p>Portfolio: <a href="https://rajeel-rajeelsiddiqui1s-projects.vercel.app/" target="_blank" className="underline">Profile</a></p>
      </>
    ),
    link: "#"
  },
  {
    title: "Muskan Riaz",
    description: (
      <>
        <p>Software Management Officer In Iqra Riaz-Ul-Atfal Model School</p>
        <p>Email: <a href="mailto:muskanriazaptech@gmail.com" className="underline">muskanriazaptech@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/muskan-riaz-928516379" target="_blank" className="underline">Profile</a></p>
        <p>GitHub: <a href="https://github.com/MuskanRiaz15" target="_blank" className="underline">Profile</a></p>
      </>
    ),
    link: "#"
  },
  {
    title: "Muhammad Hamza",
    description: (
      <>
        <p>Full-Stack AI Developer at IF condition</p>
        <p>Email: <a href="mailto:hamzapersnol321@gmail.com" className="underline">hamzapersnol321@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/muhammad-hamza-507761274" target="_blank" className="underline">Profile</a></p>
        <p>GitHub: <a href="https://github.com/Hamza123545" target="_blank" className="underline">Profile</a></p>
      </>
    ),
    link: "#"
  },
  {
    title: "Hafiz Aadil Abd Al MOIZZ Noorani",
    description: (
      <>
        <p>Backend Developer at Tech Solutions</p>
        <p>Email: <a href="mailto:aadilabdulmoizznoorani@gmail.com" className="underline">aadilabdulmoizznoorani@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/hafiz-aadil-abdul-moizz-noorani-full-stack-developer-106a2b315/" target="_blank" className="underline">Profile</a></p>
        <p>Portfolio: <a href=" http://hafizaadilabdulmoizznooraniportfoliyo.netlify.app/" target="_blank" className="underline">Profile</a></p>
      </>
    ),
    link: "#"
  },
];




export function Devlopers() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={developers} />
    </div>
  );
}
