import { Suspense } from "react";
import Loading from "./Loading";
import Lens from "../models/Lens";
import { ContactShadows, Environment } from "@react-three/drei";
import dynamic from "next/dynamic";

const Selector = dynamic(() => import("./Selector"), {
  ssr: false,
});

const ExperienceOverlay = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, -5]}
        castShadow
      />
      <Environment preset="sunset" blur={1} />
      <Suspense fallback={<Loading />}>
        <Selector>
          <Lens scale={4} position={[0, -0.09, 0]} />
          <ContactShadows
            resolution={512}
            position={[0, -0.8, 0]}
            opacity={1}
            scale={10}
            blur={2}
            far={0.8}
          />
        </Selector>
      </Suspense>
    </>
  );
};

export default ExperienceOverlay;
