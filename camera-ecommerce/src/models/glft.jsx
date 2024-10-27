/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: santy (https://sketchfab.com/Santy)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/camera-canon-eos-400d-c8c3f307e93f4c829d579d1b369e6b02
Title: Camera CANON EOS 400D
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/camera-transformed.glb')
  return (
    <group {...props} dispose={null}>
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
  )
}

useGLTF.preload('/camera-transformed.glb')