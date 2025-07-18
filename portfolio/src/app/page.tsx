
"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ViewCanvas from "./components/ViewCanvas";
import Loader from "./components/Loader"
import { useState, useEffect } from "react";
import About from "./about/page";

import FadeInComponent from "./components/FadeIn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { progress } = require("@react-three/drei").useProgress();

    useEffect(() => {
    if (progress === 100) {
      const t = setTimeout(() => setIsLoaded(true), 500); // fade buffer
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <div className="container mx-auto max-w-7xl  justify-center items-center">
      <Loader isLoaded={isLoaded}/>
        {isLoaded && (
          <>
            <FadeInComponent>
              <ViewCanvas />
              <About />
            </FadeInComponent>
          </>
          
            
          
        )}
        
    </div>
  );
}