import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function BackgroundLinesDemo({ children }) {
  return (
    <BackgroundLines className="w-full px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans relative z-20 font-bold tracking-tight items-center flex justify-center">
        {children}
      </h2>
    </BackgroundLines>
  );
}
