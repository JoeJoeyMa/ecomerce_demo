"use client";

import React, { useContext, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { easing } from "maath";

import { MeshTransmissionMaterial } from "@react-three/drei";
import { StoreContext } from "@/context/StoreContext";

const Selector = ({ children }) => {
  const { open, setOpen } = useContext(StoreContext);
  console.log(open);
  const ref = useRef();

  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
      open ? 0 : 0.1,
      delta
    );
    easing.damp3(ref.current.scale, open ? 4 : 0.01, open ? 0.5 : 0.2, delta);
    easing.dampC(
      ref.current.material.color,
      open ? "#f0f0f0" : "#ccc",
      0.1,
      delta
    );
  });
  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          anisotropicBlur={0.1}
          thickness={0.1}
          roughness={0.4}
          toneMapped={true}
        />
      </mesh>
      <group
        onPointerOver={() => setOpen(true)}
        onPointerOut={() => setOpen(false)}
        onPointerDown={() => setOpen(true)}
        onPointerUp={() => setOpen(false)}
      >
        {children}
      </group>
    </>
  );
};
export default Selector;
