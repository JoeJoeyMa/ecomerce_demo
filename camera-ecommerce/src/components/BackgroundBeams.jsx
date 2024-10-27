"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/Experience";
import MovingBorderButton from "@/components/MovingBorderButton";

export default function BackgroundBeams() {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="flex justify-center items-center px-4 gap-8 max-lg:flex-col-reverse w-full h-screen max-lg:gap-0">
          <div className="w-2/5 flex flex-col items-center justify-center pl-10 max-lg:w-full max-lg:pb-28">
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-5xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              What&apos;s best photography camera?{" "}
              <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className="">Try Canon EOS 400D.</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span className="">Try Canon EOS 400D.</span>
                </div>
              </div>
            </h2>
            <div>
              <MovingBorderButton>Pre-Order Now</MovingBorderButton>
            </div>
          </div>
          <div className="w-3/5 h-screen max-lg:w-full max-lg:pt-20">
            <Canvas
              shadows
              dpr={[1, 2]}
              gl={{
                antialias: true,
              }}
              camera={{
                fov: 50,
                position: [0, 0, 1.1],
              }}
            >
              <Experience />
            </Canvas>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
}
