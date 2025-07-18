// components/FullPageLoader.tsx
"use client";
import { useProgress } from "@react-three/drei";

export default function Loader({ isLoaded }: { isLoaded: boolean }) {
  const { progress } = useProgress();

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10000,
        inset: 0,
        background: "#111",
        display: isLoaded ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.6s",
        opacity: isLoaded ? 0 : 1,
        pointerEvents: isLoaded ? "none" : "auto",
        flexDirection: "column",
      }}
    >
      <div style={{
        color: "#fff",
        fontSize: 24,
        marginBottom: 20,
        letterSpacing: 1
      }}>
        Loading {Math.floor(progress)}%
      </div>
      <div style={{
        width: 200,
        height: 8,
        borderRadius: 4,
        background: "#222",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #98f6ff, #81e3ff 70%)",
          transition: "width 0.25s"
        }} />
      </div>
    </div>
  );
}
