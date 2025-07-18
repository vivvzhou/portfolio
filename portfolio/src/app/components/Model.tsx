import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"
import React, { useRef } from "react";
import * as THREE from "three";
import { useControls } from 'leva'




export default function Model(props) {
    const groupRef = useRef<THREE.Group>(null);
    const { nodes } = useGLTF('/flower.glb');
    const { viewport } = useThree();

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 0.8, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: false},
    })



    return (
        <group {...props} dispose={null}  maxHeight={viewport.width < 4 ? 1 : 12.5} position={viewport.width < 4 ? [0,-.4,0] : [0,-.2,0]}>
            <Text  font={'/fonts/NeueMontreal-Bold.otf'} position={[0,3,0]} fontSize={viewport.width < 4 ? 1 : 1.5} color="white" anchorX="center" anchorY="middle">
                hi! i'm vivian
            </Text>
            <Text font={'/fonts/NeueMontreal-Medium.otf'} position={[.2,1.7,0]} maxWidth={viewport.width < 4 ? 6 : 13.5} fontSize={viewport.width < 4 ? .25 : .3} color="white" anchorX="center" anchorY="middle">
                rising second year at Georgia Tech interested in AI, computer graphics, design, and building cool things.
            </Text>
            <group ref={groupRef}  scale={viewport.width < 4 ? 1 : 1.7} position={viewport.width < 4 ? [0,-.7,0] : [0,-2,0]}>
                <mesh
                    geometry={(nodes.petal1 as THREE.Mesh).geometry}
                    rotation={[-0.092, -0.064, -0.06]}
                    
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal2 as THREE.Mesh).geometry}
                    rotation={[0.282, -1.168, 0.397]}
                    scale={1.571}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal3 as THREE.Mesh).geometry}
                    position={[0.038, 0.14, 0.33]}
                    rotation={[-0.379, -0.078, -0.033]}
                    scale={[1, 1.47, 1]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal4 as THREE.Mesh).geometry}
                    rotation={[0.391, -1.013, 0.336]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal5 as THREE.Mesh).geometry}
                    rotation={[2.827, -1.025, 2.87]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal6 as THREE.Mesh).geometry}
                    rotation={[-3.138, 0, Math.PI]}
                    scale={0.964}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal7 as THREE.Mesh).geometry}
                    rotation={[2.766, 1.015, -2.818]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal8 as THREE.Mesh).geometry}
                    rotation={[0.036, 1.047, -0.031]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal9 as THREE.Mesh).geometry}
                    rotation={[2.912, -0.717, 2.82]}
                    scale={1.571}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal10 as THREE.Mesh).geometry}
                    position={[0.168, -0.054, -0.076]}
                    rotation={[2.855, 1.156, -2.746]}
                    scale={1.571}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal11 as THREE.Mesh).geometry}
                    rotation={[0.07, 0.418, 0.074]}
                    scale={1.571}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal12 as THREE.Mesh).geometry}
                    position={[-0.432, 0.064, -0.357]}
                    rotation={[-2.636, -0.987, -2.709]}
                    scale={[1, 1.47, 1]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal13 as THREE.Mesh).geometry}
                    position={[0.004, 0.23, -0.177]}
                    rotation={[-2.782, 0.292, 3.095]}
                    scale={[1, 1.47, 1]}

                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal14 as THREE.Mesh).geometry}
                    position={[0.428, 0.346, 0.015]}
                    rotation={[-1.594, 1.146, 1.509]}
                    scale={[1, 1.47, 1]}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal15 as THREE.Mesh).geometry}
                    position={[-0.157, -0.002, -0.137]}
                    rotation={[-2.902, 1.313, 2.958]}
                    scale={1.14}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
                <mesh
                    geometry={(nodes.petal16 as THREE.Mesh).geometry}
                    position={[-0.158, 0.006, -0.127]}
                    rotation={[2.727, 1.107, -2.886]}
                    scale={1.23}
                >
                    <MeshTransmissionMaterial {...materialProps}/>
                </mesh>
            </group>
            
            
        </group>
    );
}

useGLTF.preload('/flower.glb');

/*
<mesh
                geometry={(nodes.middle as THREE.Mesh).geometry}
                position={[0.224, -0.289, -0.072]}
                rotation={[1.627, 0.112, -0.492]}
            >
                <MeshTransmissionMaterial {...materialProps}/>
            </mesh>
*/