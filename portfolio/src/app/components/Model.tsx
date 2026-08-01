import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { MutableRefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { FlowerMaterialSettings } from "./FlowerMaterial";

export type FlowerMotion = {
  pointerX: number;
  pointerY: number;
  scrollProgress: number;
};

type ModelProps = {
  scale: [number, number, number];
  material: FlowerMaterialSettings;
  motion: MutableRefObject<FlowerMotion>;
  reducedMotion?: boolean;
  introReady?: boolean;
  onReady?: () => void;
};

type Petal = {
  node: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

const petals: Petal[] = [
  { node: "petal1", rotation: [-0.092, -0.064, -0.06] },
  { node: "petal2", rotation: [0.282, -1.168, 0.397], scale: 1.571 },
  { node: "petal3", position: [0.038, 0.14, 0.33], rotation: [-0.379, -0.078, -0.033], scale: [1, 1.47, 1] },
  { node: "petal4", rotation: [0.391, -1.013, 0.336] },
  { node: "petal5", rotation: [2.827, -1.025, 2.87] },
  { node: "petal6", rotation: [-3.138, 0, Math.PI], scale: 0.964 },
  { node: "petal7", rotation: [2.766, 1.015, -2.818] },
  { node: "petal8", rotation: [0.036, 1.047, -0.031] },
  { node: "petal9", rotation: [2.912, -0.717, 2.82], scale: 1.571 },
  { node: "petal10", position: [0.168, -0.054, -0.076], rotation: [2.855, 1.156, -2.746], scale: 1.571 },
  { node: "petal11", rotation: [0.07, 0.418, 0.074], scale: 1.571 },
  { node: "petal12", position: [-0.432, 0.064, -0.357], rotation: [-2.636, -0.987, -2.709], scale: [1, 1.47, 1] },
  { node: "petal13", position: [0.004, 0.23, -0.177], rotation: [-2.782, 0.292, 3.095], scale: [1, 1.47, 1] },
  { node: "petal14", position: [0.428, 0.346, 0.015], rotation: [-1.594, 1.146, 1.509], scale: [1, 1.47, 1] },
  { node: "petal15", position: [-0.157, -0.002, -0.137], rotation: [-2.902, 1.313, 2.958], scale: 1.14 },
  { node: "petal16", position: [-0.158, 0.006, -0.127], rotation: [2.727, 1.107, -2.886], scale: 1.23 },
];

export default function Model({ scale, material, motion, reducedMotion = false, introReady = true, onReady }: ModelProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const glassMaterialRef = useRef<{ opacity: number } | null>(null);
  const hasReportedReady = useRef(false);
  const introStartedAt = useRef<number | null>(null);
  const { nodes } = useGLTF("/flower.glb") as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };
  const { viewport } = useThree();
  const flowerGeometry = useMemo(() => {
    const geometries = petals.map((petal) => {
      const geometry = nodes[petal.node].geometry.clone();
      const scaleValue = petal.scale ?? 1;
      const scaleVector = typeof scaleValue === "number"
        ? new THREE.Vector3(scaleValue, scaleValue, scaleValue)
        : new THREE.Vector3(...scaleValue);
      const matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(...(petal.position ?? [0, 0, 0])),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...(petal.rotation ?? [0, 0, 0]))),
        scaleVector,
      );

      return geometry.applyMatrix4(matrix);
    });
    const merged = mergeGeometries(geometries, false);

    if (!merged) {
      throw new Error("Unable to merge flower geometry.");
    }

    return merged;
  }, [nodes]);
  useEffect(() => () => flowerGeometry.dispose(), [flowerGeometry]);

  useFrame(({ clock }, delta) => {
    let revealProgress = 0;
    if (reducedMotion) {
      revealProgress = 1;
    } else if (introReady) {
      if (introStartedAt.current === null) introStartedAt.current = clock.elapsedTime;
      revealProgress = THREE.MathUtils.clamp((clock.elapsedTime - introStartedAt.current - 0.12) / 2.8, 0, 1);
    } else {
      introStartedAt.current = null;
    }
    const reveal = 1 - Math.pow(1 - revealProgress, 3);

    if (glassMaterialRef.current) {
      glassMaterialRef.current.opacity = reveal;
    }
    if (sceneGroupRef.current) {
      const revealScale = 0.62 + reveal * 0.38;
      sceneGroupRef.current.scale.set(scale[0] * revealScale, scale[1] * revealScale, scale[2] * revealScale);
      sceneGroupRef.current.position.set(
        0,
        (viewport.width < 4 ? -0.65 : -0.1) - (1 - reveal) * 0.34,
        -(1 - reveal) * 0.72,
      );
      sceneGroupRef.current.rotation.set((1 - reveal) * 0.08, (1 - reveal) * -0.16, 0);
    }

    if (!groupRef.current) return;
    if (!hasReportedReady.current && clock.elapsedTime >= 0.12) {
      hasReportedReady.current = true;
      onReady?.();
    }
    const state = motion.current;
    const scroll = state.scrollProgress;
    const idleDrift = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.11) * 0.13;
    const targetX = state.pointerY * -0.035 + Math.sin(scroll * 1.9) * 0.13;
    const targetY = state.pointerX * 0.045 + scroll * Math.PI * 0.7 + idleDrift;
    const targetZ = state.pointerX * -0.014 + Math.cos(scroll * 1.35) * 0.07;

    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 1.8, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 1.8, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ, 1.8, delta);
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, state.pointerX * 0.16, 1.8, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      viewport.width < 4 ? -0.75 : -3.15 + Math.sin(scroll * 2) * 0.18,
      2.4,
      delta,
    );
  });

  return (
    <group ref={sceneGroupRef} scale={scale} position={viewport.width < 4 ? [0, -0.65, 0] : [0, -0.1, 0]}>
      <group
        ref={groupRef}
        scale={viewport.width < 4 ? 1 : 1.7}
        position={viewport.width < 4 ? [0, -0.75, 0] : [0, -3.15, 0]}
      >
        <mesh geometry={flowerGeometry} renderOrder={2}>
          <MeshTransmissionMaterial
            ref={(material) => {
              glassMaterialRef.current = material as unknown as { opacity: number } | null;
            }}
            samples={2}
            resolution={256}
            thickness={material.thickness}
            roughness={material.roughness}
            transmission={material.transmission}
            ior={material.ior}
            chromaticAberration={material.chromaticAberration}
            backside={material.backside}
            backsideResolution={128}
            transparent
            opacity={0}
            depthWrite={false}
            depthTest
            side={THREE.DoubleSide}
            forceSinglePass
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/flower.glb");
