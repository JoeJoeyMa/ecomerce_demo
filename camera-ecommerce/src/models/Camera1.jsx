"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Camera1(props) {
  const { nodes, materials } = useGLTF("./camera-transformed.glb");
  const cameraRef = useRef();

  useFrame((state) => {
    // cameraRef.current.rotation.y += delta * 0.3;
    const t = state.clock.getElapsedTime();
    // cameraRef.current.rotation.set(
    //   0.1 + Math.cos(t / 4.5) / 10,
    //   Math.sin(t / 4) / 4,
    //   0.3 - (1 + Math.sin(t / 4)) / 8
    // );
    cameraRef.current.rotation.set(
      0.1 + Math.cos(t / 4.5) / 5,
      Math.sin(t / 4) / 2,
      0.3 - (1 + Math.sin(t / 4)) / 5
    );
    cameraRef.current.position.y = (1 + Math.sin(t / 2)) / 25;
  });

  return (
    <group
      ref={cameraRef}
      {...props}
      dispose={null}
      onClick={() => console.log("clicked")}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mid_2_Camara_material_0.geometry}
        material={materials.Camara_material}
        position={[0, 0, -0.69]}
        scale={[2.022, 1.969, 1.256]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cilindro_low1_Cilindro_material_0.geometry}
        material={materials.Cilindro_material}
        position={[0, 0, -0.009]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cilindro_low1_lambert3_0.geometry}
        material={materials.lambert3}
        position={[0, 0, -0.009]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cilindro_low1_lambert1_0.geometry}
        material={materials.lambert1}
        position={[0, 0, -0.009]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cilindro_low1_lambert4_0.geometry}
        material={materials.lambert4}
        position={[0, 0, -0.009]}
        scale={0.929}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder9_ruleta__0.geometry}
        material={materials.ruleta}
        position={[-1.129, 1.083, -0.797]}
        rotation={[-0.001, 0.019, 0.24]}
        scale={[0.315, 0.054, 0.315]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCylinder8_ruleta_2_0.geometry}
        material={materials.ruleta_2}
        position={[-1.627, 0.788, 0.085]}
        rotation={[1.56, 0.012, -0.041]}
        scale={[0.184, 0.029, 0.184]}
      />
    </group>
  );
}

useGLTF.preload("./camera-transformed.glb");
