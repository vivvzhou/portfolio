"use client";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Preloader() {
  useEffect(() => {
    useGLTF.preload("/flower.glb");          // Start preloading your model
    // useTexture.preload("/some-texture.jpg"); // If you use textures
  }, []);
  return (null);
}