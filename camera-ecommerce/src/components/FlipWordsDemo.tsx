import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["better", "cute", "beautiful", "happy"];

  return (
    <div className="flex justify-center items-center">
      <div className="text-5xl mx-auto">
        Capture your
        <FlipWords words={words} />
        moments with camera.
      </div>
    </div>
  );
}
