"use client";
import React from "react";
import { Button } from "./ui/moving-border";

export default function MovingBorderButton({ children }) {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        {children}
      </Button>
    </div>
  );
}
