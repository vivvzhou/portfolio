"use client";
import { Suspense } from "react";
import React from "react";
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei";
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {}

const Model = React.lazy(() => import("./Model"))



export default function ViewCanvas({} : Props) {
    return (
        <div className="h-150">
            <Canvas
                className="flower"
                style={{
                    position: "relative",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 30,
                }}
                shadows
                dpr={[1, 1.5]}
                gl={{antialias: true}}
                camera={{
                    fov: 30,
                }}
            >
                <directionalLight intensity={3} position={[0, 3, 4]} /> 
                
                <Suspense fallback={null}>
                    <Model scale={[.3, .3, .3]}/>
                </Suspense>
                <Environment preset='studio' />
            </Canvas>
        </div>

    )
}