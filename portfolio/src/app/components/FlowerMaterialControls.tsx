"use client";

import type { CSSProperties } from "react";
import { useFlowerMaterial, type FlowerMaterialSettings } from "./FlowerMaterial";
import styles from "./flower-material-controls.module.css";

type NumericSetting = Exclude<keyof FlowerMaterialSettings, "backside">;

type Slider = {
  label: string;
  key: NumericSetting;
  min: number;
  max: number;
  step: number;
  precision: number;
};

const sliders: Slider[] = [
  { label: "thickness", key: "thickness", min: 0, max: 3, step: 0.05, precision: 2 },
  { label: "roughness", key: "roughness", min: 0, max: 1, step: 0.1, precision: 1 },
  { label: "transmission", key: "transmission", min: 0, max: 1, step: 0.1, precision: 1 },
  { label: "ior", key: "ior", min: 0, max: 3, step: 0.1, precision: 1 },
  { label: "chromatic aberration", key: "chromaticAberration", min: 0, max: 1, step: 0.01, precision: 2 },
];

export default function FlowerMaterialControls() {
  const { material, updateMaterial, resetMaterial } = useFlowerMaterial();

  return (
    <aside className={styles.controls} aria-label="Flower glass controls">
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span>Flower / material</span>
          <button type="button" onClick={resetMaterial}>Reset</button>
        </div>
        <div className={styles.sliderList}>
          {sliders.map((slider) => {
            const value = material[slider.key];
            const progress = ((value - slider.min) / (slider.max - slider.min)) * 100;

            return (
              <label className={styles.sliderRow} key={slider.key}>
                <span>{slider.label}</span>
                <input
                  aria-label={slider.label}
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={value}
                  style={{ "--range-progress": `${progress}%` } as CSSProperties}
                  onChange={(event) => updateMaterial({
                    [slider.key]: event.currentTarget.valueAsNumber,
                  } as Partial<FlowerMaterialSettings>)}
                />
                <output>{value.toFixed(slider.precision)}</output>
              </label>
            );
          })}
        </div>
        <label className={styles.checkboxRow}>
          <span>backside</span>
          <input
            type="checkbox"
            checked={material.backside}
            onChange={(event) => updateMaterial({ backside: event.currentTarget.checked })}
          />
          <i aria-hidden="true" />
        </label>
      </div>
    </aside>
  );
}
