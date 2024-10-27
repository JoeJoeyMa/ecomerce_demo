import { OrbitControls, useHelper } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Loading from "./Loading";
import Camera1 from "../models/Camera1";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const Experience = () => {
  const directionalLight = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <OrbitControls makeDefault enablePan={false} enableZoom={false} />

      <ambientLight intensity={2} />
      <spotLight
        position={[1, 6, 1.5]}
        angle={0.2}
        penumbra={1}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-5, 5, -1.5]}
        angle={0.03}
        penumbra={1}
        intensity={4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[5, 5, -5]}
        angle={0.3}
        penumbra={1}
        intensity={4}
        castShadow={true}
        shadow-mapSize={[256, 256]}
        color="#ffffc0"
      />
      <Suspense fallback={<Loading />}>
        <Camera1 scale={0.15} position={[0, -0.09, 0]} />

        <ContactShadows
          frames={1}
          rotation-x={[Math.PI / 2]}
          position={[0, -0.33, 0]}
          far={0.4}
          width={1}
          height={1}
          blur={1}
        />
      </Suspense>
    </>
  );
};

export default Experience;
