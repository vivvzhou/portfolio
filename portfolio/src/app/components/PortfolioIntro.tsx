"use client";

import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

type PortfolioIntroContextValue = {
  introReady: boolean;
  markSceneReady: () => void;
};

const PortfolioIntroContext = createContext<PortfolioIntroContextValue | null>(null);

export function PortfolioIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [introReady, setIntroReady] = useState(pathname !== "/");

  useEffect(() => {
    setIntroReady(pathname !== "/");
  }, [pathname]);

  const markSceneReady = useCallback(() => setIntroReady(true), []);
  const value = useMemo(() => ({ introReady, markSceneReady }), [introReady, markSceneReady]);

  return <PortfolioIntroContext.Provider value={value}>{children}</PortfolioIntroContext.Provider>;
}

export function usePortfolioIntro() {
  const context = useContext(PortfolioIntroContext);
  if (!context) {
    throw new Error("usePortfolioIntro must be used inside PortfolioIntroProvider.");
  }

  return context;
}
