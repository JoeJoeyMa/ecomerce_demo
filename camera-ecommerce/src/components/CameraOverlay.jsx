"use client";

import { Canvas } from "@react-three/fiber";

import ExperienceOverlay from "./ExperienceOverlay";
import InfiniteMovingCardsDemo from "./InfiniteMovingCardsDemo";

const CameraOverlay = () => {
  return (
    <div className="w-full h-full absolute flex justify-center items-center max-lg:flex-col">
      <div className="w-2/5 h-full p-2 max-lg:w-full max-lg:mt-40">
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }}>
          <ExperienceOverlay />
        </Canvas>
      </div>
      <div className="w-3/5 h-full p-2 max-lg:w-full max-lg:h-[500px]">
        <InfiniteMovingCardsDemo />
      </div>
    </div>
  );
};

export default CameraOverlay;
