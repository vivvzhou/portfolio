"use client";

import { useGSAP } from "@gsap/react";
import { Environment, Lightformer } from "@react-three/drei";
import { Component, type ErrorInfo, type ReactNode, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import HeroEnvironment from "./HeroEnvironment";
import { useFlowerMaterial } from "./FlowerMaterial";
import Model, { type FlowerMotion } from "./Model";
import { usePortfolioIntro } from "./PortfolioIntro";
import SceneWordmark from "./SceneWordmark";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_SCRUB = 1.8;

type ViewCanvasProps = {
  onContextLost: () => void;
  onReady: () => void;
};

type SceneErrorBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type SceneErrorBoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    void error;
    void info;
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function StudioGlassLighting() {
  return (
    <>
      <ambientLight color="#dce8ff" intensity={0.24} />
      <directionalLight color="#f7faff" intensity={2.1} position={[0, 3, 4]} />
      <Environment background={false} frames={1} resolution={128}>
        <Lightformer color="#ffffff" form="rect" intensity={6.4} position={[-4, 6, -4]} scale={[7, 1.6, 1]} />
        <Lightformer color="#d9e7ff" form="rect" intensity={3.4} position={[5, 1, 3]} scale={[1.6, 6, 1]} />
        <Lightformer color="#3d5cff" form="rect" intensity={4.6} position={[-5, -1, 4]} scale={[2.4, 2.2, 1]} />
        <Lightformer color="#ff58b3" form="rect" intensity={3.1} position={[1, -4, 4]} scale={[4, 1, 1]} />
        <Lightformer color="#6fefff" form="rect" intensity={2.8} position={[0, 2.4, 5]} scale={[5.6, 0.7, 1]} />
      </Environment>
    </>
  );
}

export default function ViewCanvas({ onContextLost, onReady }: ViewCanvasProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const removeContextListener = useRef<(() => void) | null>(null);
  const flowerMotion = useRef<FlowerMotion>({
    pointerX: 0,
    pointerY: 0,
    scrollProgress: 0,
  });
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { material } = useFlowerMaterial();
  const { introReady, skipIntro } = usePortfolioIntro();
  const [hasMounted, setHasMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isSceneRelevant, setIsSceneRelevant] = useState(true);
  const shouldAnimate = hasMounted && isPageVisible && isSceneRelevant && !prefersReducedMotion;

  useEffect(() => {
    setHasMounted(true);
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const largeMediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
      setIsLargeDesktop(largeMediaQuery.matches);
    };
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    largeMediaQuery.addEventListener("change", updateViewport);
    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
      largeMediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => () => removeContextListener.current?.(), []);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let delayedSync = 0;
    let scrollFrame = 0;

    const syncScrollProgress = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const work = document.getElementById("work");
      const experience = document.getElementById("experience");
      if (!hero || !work || !experience) return;

      const scrollY = window.scrollY;
      const heroProgress = THREE.MathUtils.clamp(
        (scrollY - hero.offsetTop) / Math.max(hero.offsetHeight, 1),
        0,
        1,
      );
      const workProgress = THREE.MathUtils.clamp(
        (scrollY - work.offsetTop) / Math.max(work.offsetHeight - window.innerHeight, 1),
        0,
        1,
      );

      flowerMotion.current.scrollProgress = scrollY < work.offsetTop
        ? heroProgress * 0.7
        : 0.7 + workProgress * 3.2;

      const exitStart = experience.offsetTop - window.innerHeight;
      const exitEnd = experience.offsetTop - window.innerHeight * 0.3;
      const exitProgress = THREE.MathUtils.clamp(
        (scrollY - exitStart) / Math.max(exitEnd - exitStart, 1),
        0,
        1,
      );

      if (sceneRef.current) {
        gsap.set(sceneRef.current, {
          yPercent: -2 - exitProgress * 106,
          opacity: 1 - exitProgress,
        });
      }
    };

    const scheduleSync = () => {
      syncScrollProgress();
      firstFrame = window.requestAnimationFrame(() => {
        syncScrollProgress();
        secondFrame = window.requestAnimationFrame(syncScrollProgress);
      });
    };

    scheduleSync();
    delayedSync = window.setTimeout(syncScrollProgress, 180);
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        syncScrollProgress();
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pageshow", scheduleSync);
    window.addEventListener("load", scheduleSync);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(delayedSync);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", scheduleSync);
      window.removeEventListener("load", scheduleSync);
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const work = document.getElementById("work");
    if (!hero || !work) return;

    let frame = 0;
    const updateSceneRelevance = () => {
      const sceneStart = Math.max(0, hero.offsetTop - window.innerHeight);
      const sceneEnd = work.offsetTop + work.offsetHeight + window.innerHeight;
      const scrollY = window.scrollY;
      setIsSceneRelevant(scrollY >= sceneStart && scrollY <= sceneEnd);
    };
    const scheduleSceneRelevance = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateSceneRelevance();
      });
    };

    updateSceneRelevance();
    window.addEventListener("scroll", scheduleSceneRelevance, { passive: true });
    window.addEventListener("resize", scheduleSceneRelevance);
    window.addEventListener("pageshow", scheduleSceneRelevance);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleSceneRelevance);
      window.removeEventListener("resize", scheduleSceneRelevance);
      window.removeEventListener("pageshow", scheduleSceneRelevance);
    };
  }, []);

  useEffect(() => {
    if (!isSceneRelevant || !isDesktop) return;

    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isDesktop, isSceneRelevant]);

  const handleCanvasCreated = useCallback((state: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) => {
    const { gl, scene } = state;
    removeContextListener.current?.();
    scene.background = null;
    gl.setClearColor(0x000000, 0);
    gl.setClearAlpha(0);

    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onContextLost();
    };

    gl.domElement.addEventListener("webglcontextlost", handleContextLoss, { once: true });
    removeContextListener.current = () => {
      gl.domElement.removeEventListener("webglcontextlost", handleContextLoss);
      removeContextListener.current = null;
    };
  }, [onContextLost]);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion || !isSceneRelevant) return;

    const updatePointer = (event: PointerEvent) => {
      flowerMotion.current.pointerX = event.clientX / window.innerWidth - 0.5;
      flowerMotion.current.pointerY = event.clientY / window.innerHeight - 0.5;
    };
    const resetPointer = () => {
      flowerMotion.current.pointerX = 0;
      flowerMotion.current.pointerY = 0;
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [isDesktop, isSceneRelevant, prefersReducedMotion]);

  useGSAP(
    () => {
      const scene = sceneRef.current;
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      const work = document.getElementById("work");
      const experience = document.getElementById("experience");
      const workOrbit = document.querySelector<HTMLElement>("[data-work-orbit]");
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-card]"));
      if (!scene || !hero || !work || !experience || !workOrbit || !isDesktop || prefersReducedMotion || !introReady) return;

      gsap.fromTo(
        workOrbit,
        { xPercent: 20, yPercent: 0, opacity: 0 },
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: work,
            start: "top 88%",
            end: "top 18%",
            scrub: SCROLL_SCRUB,
          },
        },
      );

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: SCROLL_SCRUB,
          onUpdate: (trigger) => {
            flowerMotion.current.scrollProgress = trigger.progress * 0.7;
          },
        },
      });

      heroTimeline.to(scene, {
        yPercent: -2,
        opacity: 1,
        ease: "none",
      });

      const positionCards = (progress: number) => {
        const radiusX = Math.min(window.innerWidth * 0.6, 800);

        cards.forEach((card, index) => {
          const angle = progress * Math.PI * 2.5 + index * ((Math.PI * 2) / cards.length);
          const depth = (Math.cos(angle) + 1) / 2;
          const scale = 0.62 + depth * 0.46;
          const opacity = 0.62 + Math.pow(depth, 1.15) * 0.38;

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: Math.sin(angle) * radiusX,
            y: Math.sin(angle * 2) * 24,
            z: (depth - 1) * 580,
            rotateY: -Math.sin(angle) * 58,
            rotateZ: Math.sin(angle) * -2,
            scale,
            opacity,
            zIndex: Math.round(depth * 10),
          });
        });
      };

      positionCards(0);

      ScrollTrigger.create({
        trigger: work,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (trigger) => {
          flowerMotion.current.scrollProgress = 0.7 + trigger.progress * 3.2;
          positionCards(trigger.progress);
          gsap.set(scene, { yPercent: -2, opacity: 1 });
        },
        onRefresh: (trigger) => positionCards(trigger.progress),
      });

      gsap.fromTo(
        scene,
        { yPercent: -2, opacity: 1 },
        {
          yPercent: -108,
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: experience,
            start: "top bottom",
            end: "top 30%",
            scrub: SCROLL_SCRUB,
          },
        },
      );

      let firstFrame = 0;
      let secondFrame = 0;
      let delayedRefresh = 0;
      const refreshScrollState = () => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      };
      const scheduleRefresh = () => {
        refreshScrollState();
        firstFrame = window.requestAnimationFrame(() => {
          refreshScrollState();
          secondFrame = window.requestAnimationFrame(refreshScrollState);
        });
      };

      scheduleRefresh();
      delayedRefresh = window.setTimeout(refreshScrollState, 180);
      window.addEventListener("pageshow", scheduleRefresh);
      window.addEventListener("load", scheduleRefresh);

      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        window.clearTimeout(delayedRefresh);
        window.removeEventListener("pageshow", scheduleRefresh);
        window.removeEventListener("load", scheduleRefresh);
      };
    },
    { dependencies: [introReady, isDesktop, prefersReducedMotion, skipIntro], scope: sceneRef },
  );

  return (
    <div className="portfolio-scene__canvas" ref={sceneRef}>
      {hasMounted ? (
        <Canvas
          dpr={isLargeDesktop ? [1, 1.25] : [1, 1]}
          frameloop={shouldAnimate ? "always" : "demand"}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
          camera={{ fov: 30, position: [0, 0, 12] }}
          onCreated={handleCanvasCreated}
          style={{ background: "transparent" }}
        >
          <SceneErrorBoundary onError={onContextLost}>
            <StudioGlassLighting />
            <HeroEnvironment
              motion={flowerMotion}
              reducedMotion={prefersReducedMotion}
              isDesktop={isLargeDesktop}
              showPanels
            />
            <Suspense fallback={null}>
              <SceneWordmark motion={flowerMotion} reducedMotion={prefersReducedMotion} skipIntro={skipIntro} />
              <Model
                scale={[0.68, 0.68, 0.68]}
                material={material}
                motion={flowerMotion}
                reducedMotion={prefersReducedMotion}
                introReady={introReady}
                skipIntro={skipIntro}
                onReady={onReady}
              />
            </Suspense>
          </SceneErrorBoundary>
        </Canvas>
      ) : null}
    </div>
  );
}
