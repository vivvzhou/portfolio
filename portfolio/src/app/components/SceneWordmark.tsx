"use client";

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { useRef } from "react";
import * as THREE from "three";
import type { FlowerMotion } from "./Model";

type SceneWordmarkProps = {
  motion: MutableRefObject<FlowerMotion>;
  reducedMotion: boolean;
  skipIntro: boolean;
};

export default function SceneWordmark({ motion, reducedMotion, skipIntro }: SceneWordmarkProps) {
  const vivianGroupRef = useRef<THREE.Group>(null);
  const projectsGroupRef = useRef<THREE.Group>(null);
  const handoffProgressRef = useRef(0);
  const hasSyncedInitialState = useRef(false);
  const { viewport } = useThree();
  const fontSize = Math.min(viewport.width * 0.145, 1.42);
  const projectsFontSize = Math.min(viewport.width * 0.17, 1.56);
  const yPosition = viewport.width < 4 ? 0.38 : 0.56;
  const wordmarkOffset = viewport.width * 0.98;

  useFrame((_, delta) => {
    const targetProgress = THREE.MathUtils.clamp((motion.current.scrollProgress - 0.22) / 0.28, 0, 1);
    const transition = reducedMotion || skipIntro || !hasSyncedInitialState.current
      ? targetProgress
      : THREE.MathUtils.damp(handoffProgressRef.current, targetProgress, 6.2, delta);
    handoffProgressRef.current = transition;
    hasSyncedInitialState.current = true;

    if (vivianGroupRef.current) {
      vivianGroupRef.current.position.x = -wordmarkOffset * transition;
    }

    if (projectsGroupRef.current) {
      projectsGroupRef.current.position.x = wordmarkOffset * (1 - transition);
    }
  });

  return (
    <>
      <group ref={vivianGroupRef} position={[0, yPosition, -1.35]}>
        <Text
          anchorX="center"
          anchorY="middle"
          color="#f8f2e9"
          font="/fonts/NeueMontreal-Bold.otf"
          fontSize={fontSize}
          letterSpacing={-0.075}
          material-depthWrite={false}
          material-toneMapped={false}
          renderOrder={1}
        >
          VIVIAN ZHOU
        </Text>
      </group>
      <group ref={projectsGroupRef} position={[wordmarkOffset, yPosition, -1.35]}>
        <Text
          anchorX="center"
          anchorY="middle"
          color="#f8f2e9"
          font="/fonts/NeueMontreal-Bold.otf"
          fontSize={projectsFontSize}
          letterSpacing={-0.065}
          material-depthWrite={false}
          material-toneMapped={false}
          renderOrder={1}
        >
          PROJECTS
        </Text>
      </group>
    </>
  );
}
