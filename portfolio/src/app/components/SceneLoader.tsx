"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { usePortfolioIntro } from "./PortfolioIntro";

const ViewCanvas = dynamic(() => import("./ViewCanvas"), { ssr: false });

export default function SceneLoader() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { markSceneReady } = usePortfolioIntro();

  const handleReady = useCallback(() => {
    setCanvasReady(true);
    markSceneReady();
  }, [markSceneReady]);

  const handleContextLost = useCallback(() => {
    setCanvasReady(false);
    setWebglFailed(true);
    setShowLoader(false);
    markSceneReady();
  }, [markSceneReady]);

  useEffect(() => {
    if (!canvasReady) return;
    if (prefersReducedMotion) {
      setShowLoader(false);
      return;
    }

    const timer = window.setTimeout(() => setShowLoader(false), 1600);
    return () => window.clearTimeout(timer);
  }, [canvasReady, prefersReducedMotion]);

  const phase = webglFailed ? "fallback" : !canvasReady ? "loading" : showLoader ? "handoff" : "ready";

  return (
    <div
      className={`portfolio-scene portfolio-scene--${phase}`}
      aria-hidden="true"
    >
      {showLoader && !webglFailed ? (
        <div className={`portfolio-scene__loader${canvasReady ? " portfolio-scene__loader--leaving" : ""}`}>
          <span>Loading</span>
          <i />
        </div>
      ) : null}
      {webglFailed ? null : <ViewCanvas onReady={handleReady} onContextLost={handleContextLost} />}
    </div>
  );
}
