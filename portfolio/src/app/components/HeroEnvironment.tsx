"use client";

import { useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { FlowerMotion } from "./Model";

type HeroEnvironmentProps = {
  motion: MutableRefObject<FlowerMotion>;
  reducedMotion: boolean;
  isDesktop: boolean;
  showPanels?: boolean;
};

type Panel = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  tint: string;
};

const roomVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const roomFragmentShader = /* glsl */ `
  uniform vec3 uLineColor;
  uniform float uOpacity;

  varying vec2 vUv;

  float gridLine(vec2 coordinate, vec2 divisions, float thickness) {
    vec2 cell = abs(fract(coordinate * divisions - 0.5) - 0.5);
    vec2 line = step(vec2(0.5 - thickness), cell);
    return max(line.x, line.y);
  }

  void main() {
    vec2 warpedUv = vUv;
    warpedUv.x = 0.5 + (warpedUv.x - 0.5) * (1.0 + abs(warpedUv.y - 0.5) * 0.76);
    warpedUv.y = pow(warpedUv.y, 0.86);

    float primary = gridLine(warpedUv, vec2(17.0, 11.0), 0.018);
    float secondary = gridLine(warpedUv, vec2(68.0, 44.0), 0.006);
    float vignette = smoothstep(0.88, 0.18, length(vUv - 0.5));

    float gridStrength = primary * 0.26 + secondary * 0.055;
    vec3 color = uLineColor * (0.60 + primary * 0.25);
    gl_FragColor = vec4(color, gridStrength * vignette * uOpacity);
  }
`;

const flowerBacklightFragmentShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vec2 centeredUv = vUv * 2.0 - 1.0;
    float oval = length(centeredUv * vec2(0.78, 1.08));
    float core = 1.0 - smoothstep(0.0, 0.42, oval);
    float glow = 1.0 - smoothstep(0.20, 1.0, oval);
    float band = smoothstep(0.78, 0.22, abs(centeredUv.y));
    vec2 cell = abs(fract(vUv * vec2(18.0, 11.0) - 0.5) - 0.5);
    float microGrid = max(step(0.475, cell.x), step(0.475, cell.y));
    float scanline = 0.5 + 0.5 * sin(vUv.y * 220.0);
    float prism = 0.5 + 0.5 * sin(vUv.x * 8.0 + vUv.y * 5.0);

    vec3 outerColor = vec3(0.13, 0.12, 0.44);
    vec3 coreColor = vec3(0.10, 0.16, 0.52);
    vec3 color = mix(outerColor, coreColor, core * 0.55);
    color += vec3(0.18, 0.26, 0.72) * glow * 0.32;
    color += mix(vec3(0.03, 0.25, 1.00), vec3(1.00, 0.16, 0.74), prism)
      * (microGrid * 0.72 + scanline * 0.06) * glow;

    float alpha = glow * 0.09 + core * 0.07 + band * glow * 0.035 + microGrid * glow * 0.12;
    gl_FragColor = vec4(color, alpha);
  }
`;

const panelVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vTint;

  void main() {
    vUv = uv;
    vTint = instanceColor;
    vec4 transformed = instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * transformed;
  }
`;

const panelFragmentShader = /* glsl */ `
  uniform float uPulse;

  varying vec2 vUv;
  varying vec3 vTint;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float border = 1.0 - smoothstep(0.012, 0.038, edgeDistance);
    float scanlines = 0.72 + 0.28 * sin(vUv.y * 180.0);
    float softMask = smoothstep(0.0, 0.16, edgeDistance);
    softMask *= smoothstep(0.0, 0.18, 1.0 - edgeDistance);
    float noise = hash21(floor(vUv * vec2(72.0, 30.0)));

    vec3 color = vTint * (0.52 + scanlines * 0.34 + border * 0.68);
    color += vec3(1.0, 0.36, 0.72) * border * 0.24;
    color *= mix(0.86, 1.28, noise);
    gl_FragColor = vec4(color * uPulse, (0.20 + border * 0.24 + scanlines * 0.07) * softMask);
  }
`;

const desktopPanels: Panel[] = [
  { position: [-5.8, 3.25, -4.9], rotation: [0, 0.06, -0.04], scale: [2.25, 0.82, 1], tint: "#ff4f9a" },
  { position: [5.45, 3.0, -5.05], rotation: [0, -0.08, 0.03], scale: [1.9, 1.16, 1], tint: "#648cff" },
  { position: [-6.2, -1.5, -4.8], rotation: [0, 0.04, 0.025], scale: [1.75, 1.02, 1], tint: "#bf3e95" },
  { position: [6.2, -1.72, -4.85], rotation: [0, -0.06, -0.02], scale: [2.3, 0.74, 1], tint: "#ff69b4" },
  { position: [-1.1, 4.0, -5.15], rotation: [0, 0, 0.02], scale: [1.45, 0.46, 1], tint: "#f85cb9" },
  { position: [-7.76, 1.6, -0.55], rotation: [0, Math.PI / 2, 0.02], scale: [2.25, 0.94, 1], tint: "#a83282" },
  { position: [-7.76, -2.55, -1.8], rotation: [0, Math.PI / 2, -0.01], scale: [1.35, 0.62, 1], tint: "#4d7eff" },
  { position: [7.76, 1.85, -0.7], rotation: [0, -Math.PI / 2, -0.02], scale: [1.95, 0.86, 1], tint: "#c4388f" },
  { position: [7.76, -2.05, -1.35], rotation: [0, -Math.PI / 2, 0.015], scale: [1.42, 0.54, 1], tint: "#7393ff" },
  { position: [-3.9, -3.92, -1.5], rotation: [-Math.PI / 2, 0.08, 0.01], scale: [1.9, 0.76, 1], tint: "#bd3c91" },
  { position: [3.65, -3.92, -1.7], rotation: [-Math.PI / 2, -0.1, -0.02], scale: [1.56, 0.62, 1], tint: "#f85eb4" },
];

const mobilePanels = desktopPanels.filter((_, index) => [0, 1, 3, 4, 6, 8].includes(index));

function GridWall({
  position,
  rotation,
  scale,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  opacity: number;
}) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    name: "HeroRoomGrid",
    uniforms: {
      uLineColor: { value: new THREE.Color("#d660a4") },
      uOpacity: { value: opacity },
    },
    vertexShader: roomVertexShader,
    fragmentShader: roomFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  }), [opacity]);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh position={position} rotation={rotation} scale={scale} renderOrder={-4}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function RoomGrid() {
  return (
    <group>
      <GridWall position={[0, 0, -5.4]} rotation={[0, 0, 0]} scale={[9.2, 5.45, 1]} opacity={1} />
      <GridWall position={[-7.8, 0, -0.45]} rotation={[0, Math.PI / 2, 0]} scale={[6.15, 5.45, 1]} opacity={0.82} />
      <GridWall position={[7.8, 0, -0.45]} rotation={[0, -Math.PI / 2, 0]} scale={[6.15, 5.45, 1]} opacity={0.82} />
      <GridWall position={[0, -4.95, -0.45]} rotation={[-Math.PI / 2, 0, 0]} scale={[9.2, 6.2, 1]} opacity={0.68} />
    </group>
  );
}

function FlowerBacklight({ isDesktop }: { isDesktop: boolean }) {
  const material = useMemo(() => new THREE.ShaderMaterial({
    name: "FlowerGlassBacklight",
    vertexShader: roomVertexShader,
    fragmentShader: flowerBacklightFragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    toneMapped: false,
  }), []);

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh
      position={[0, isDesktop ? -0.78 : -0.48, -2.8]}
      renderOrder={-2}
      scale={isDesktop ? [6.35, 3.15, 1] : [4.05, 2.1, 1]}
    >
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function EmissivePanels({
  panels,
  reducedMotion,
}: {
  panels: Panel[];
  reducedMotion: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const material = useMemo(() => new THREE.ShaderMaterial({
    name: "HeroElectricPanels",
    uniforms: {
      uPulse: { value: 1 },
    },
    vertexShader: panelVertexShader,
    fragmentShader: panelFragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  }), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const helper = new THREE.Object3D();
    const tint = new THREE.Color();

    panels.forEach((panel, index) => {
      helper.position.set(...panel.position);
      helper.rotation.set(...panel.rotation);
      helper.scale.set(...panel.scale);
      helper.updateMatrix();
      mesh.setMatrixAt(index, helper.matrix);
      mesh.setColorAt(index, tint.set(panel.tint));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [panels]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame(({ clock }) => {
    material.uniforms.uPulse.value = reducedMotion ? 1 : 0.96 + Math.sin(clock.elapsedTime * 0.28) * 0.08;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, panels.length]} renderOrder={-5} />;
}

export default function HeroEnvironment({
  motion,
  reducedMotion,
  isDesktop,
  showPanels = false,
}: HeroEnvironmentProps) {
  const environmentRef = useRef<THREE.Group>(null);
  const panels = isDesktop ? desktopPanels : mobilePanels;

  useFrame((_, delta) => {
    if (!environmentRef.current || reducedMotion) return;

    const targetX = motion.current.pointerY * -0.08;
    const targetY = motion.current.pointerX * -0.11;
    environmentRef.current.rotation.x = THREE.MathUtils.damp(environmentRef.current.rotation.x, targetX, 1.9, delta);
    environmentRef.current.rotation.y = THREE.MathUtils.damp(environmentRef.current.rotation.y, targetY, 1.9, delta);
  });

  return (
    <group ref={environmentRef} scale={isDesktop ? 1 : 0.9}>
      <RoomGrid />
      <FlowerBacklight isDesktop={isDesktop} />
      {showPanels ? <EmissivePanels panels={panels} reducedMotion={reducedMotion} /> : null}
    </group>
  );
}
