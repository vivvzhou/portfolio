"use client";

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from "react";

export type FlowerMaterialSettings = {
  thickness: number;
  roughness: number;
  transmission: number;
  ior: number;
  chromaticAberration: number;
  backside: boolean;
};

export const defaultFlowerMaterial: FlowerMaterialSettings = {
  thickness: 1.45,
  roughness: 0,
  transmission: 1,
  ior: 2.1,
  chromaticAberration: 0.1,
  backside: false,
};

type FlowerMaterialContextValue = {
  material: FlowerMaterialSettings;
  updateMaterial: (update: Partial<FlowerMaterialSettings>) => void;
  resetMaterial: () => void;
};

const FlowerMaterialContext = createContext<FlowerMaterialContextValue | null>(null);

export function FlowerMaterialProvider({ children }: { children: ReactNode }) {
  const [material, setMaterial] = useState<FlowerMaterialSettings>(defaultFlowerMaterial);

  const updateMaterial = useCallback((update: Partial<FlowerMaterialSettings>) => {
    setMaterial((current) => ({ ...current, ...update }));
  }, []);
  const resetMaterial = useCallback(() => setMaterial(defaultFlowerMaterial), []);
  const value = useMemo(
    () => ({ material, updateMaterial, resetMaterial }),
    [material, resetMaterial, updateMaterial],
  );

  return <FlowerMaterialContext.Provider value={value}>{children}</FlowerMaterialContext.Provider>;
}

export function useFlowerMaterial() {
  const context = useContext(FlowerMaterialContext);
  if (!context) {
    throw new Error("useFlowerMaterial must be used inside FlowerMaterialProvider.");
  }

  return context;
}
