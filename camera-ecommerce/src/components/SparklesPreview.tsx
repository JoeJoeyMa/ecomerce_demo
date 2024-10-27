"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import { FlipWordsDemo } from "./FlipWordsDemo";

export default function SparklesPreview() {
  return (
    <div className="h-full w-full bg-[url('/img/bg/bg-sparkles.png')] bg-cover bg-opacity-10 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-3xl text-2xl lg:text-4xl pt-10 font-bold text-center text-white relative z-20">
        <FlipWordsDemo />
      </h1>
      <div className="w-[90rem] h-20 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute mt-[-50px] inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
