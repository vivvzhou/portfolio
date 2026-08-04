"use client";

import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type PortfolioIntroContextValue = {
  introReady: boolean;
  skipIntro: boolean;
  markSceneReady: () => void;
};

const PortfolioIntroContext = createContext<PortfolioIntroContextValue | null>(null);

export function PortfolioIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [introReady, setIntroReady] = useState(pathname !== "/");
  const [skipIntro, setSkipIntro] = useState(pathname !== "/");

  useEffect(() => {
    const isHome = pathname === "/";
    let firstFrame = 0;
    let secondFrame = 0;
    let delayedCheck = 0;

    const checkInitialScrollPosition = () => {
      if (!isHome) {
        setSkipIntro(true);
        setIntroReady(true);
        return;
      }

      // Browsers restore scroll after hydration on reloads and deep links. Do
      // not play the hero handoff first, then animate it away to catch up.
      if (window.scrollY > Math.max(12, window.innerHeight * 0.02)) {
        setSkipIntro(true);
        setIntroReady(true);
      }
    };

    if (!isHome) {
      checkInitialScrollPosition();
      return;
    }

    setSkipIntro(false);
    setIntroReady(false);

    const schedulePositionCheck = () => {
      checkInitialScrollPosition();
      firstFrame = window.requestAnimationFrame(() => {
        checkInitialScrollPosition();
        secondFrame = window.requestAnimationFrame(checkInitialScrollPosition);
      });
    };

    schedulePositionCheck();
    delayedCheck = window.setTimeout(checkInitialScrollPosition, 180);
    window.addEventListener("pageshow", schedulePositionCheck);
    window.addEventListener("load", schedulePositionCheck);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(delayedCheck);
      window.removeEventListener("pageshow", schedulePositionCheck);
      window.removeEventListener("load", schedulePositionCheck);
    };
  }, [pathname]);

  const markSceneReady = useCallback(() => setIntroReady(true), []);
  const value = useMemo(() => ({ introReady, skipIntro, markSceneReady }), [introReady, skipIntro, markSceneReady]);

  return <PortfolioIntroContext.Provider value={value}>{children}</PortfolioIntroContext.Provider>;
}

export function usePortfolioIntro() {
  const context = useContext(PortfolioIntroContext);
  if (!context) {
    throw new Error("usePortfolioIntro must be used inside PortfolioIntroProvider.");
  }

  return context;
}
