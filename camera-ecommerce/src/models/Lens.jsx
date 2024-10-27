import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Lens(props) {
  const { nodes, materials } = useGLTF("./lens2-transformed.glb");
  const cameraRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    cameraRef.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    cameraRef.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
  });
  return (
    <group {...props} dispose={null} ref={cameraRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["top_ring_Material_#476_0"].geometry}
        material={materials.PaletteMaterial001}
        position={[-0.11, 0.023, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Object014_Material_#365_0"].geometry}
        material={materials.PaletteMaterial001}
        position={[0.022, 0.024, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Sphere002_Material_#473_0"].geometry}
        material={materials.PaletteMaterial002}
        position={[0, 0.119, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Circle001_Material_#474_0"].geometry}
        material={materials.PaletteMaterial003}
        position={[0, 0.155, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_14_Material_#478_0"].geometry}
        material={materials.Material_478}
        position={[0.096, 0.023, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_1_Material_#428_0"].geometry}
        material={materials.Material_428}
        position={[0.096, 0.023, -0.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_2_Material_#425_0"].geometry}
        material={materials.Material_425}
        position={[0.096, 0.023, -0.09]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_3_Material_#340_0"].geometry}
        material={materials.Material_340}
        position={[0.096, 0.023, -0.089]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_5_Material_#310_0"].geometry}
        material={materials.Material_310}
        position={[0.33, 0.023, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_7_Material_#307_0"].geometry}
        material={materials.Material_307}
        position={[0.096, 0.023, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_8_Material_#479_0"].geometry}
        material={materials.Material_479}
        position={[0.022, 0.024, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_9_Material_#395_0"].geometry}
        material={materials.Material_395}
        position={[0.114, 0.026, 0.008]}
        rotation={[0, -0.044, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_10_Material_#390_0"].geometry}
        material={materials.Material_390}
        position={[0.114, 0.026, 0.008]}
        rotation={[0, -0.044, 0]}
        scale={0.003}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["logo_11_Material_#346_0"].geometry}
        material={materials.Material_346}
        position={[0.099, 0.142, 0]}
        scale={0.003}
      />
    </group>
  );
}

useGLTF.preload("./lens2-transformed.glb");
