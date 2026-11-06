import { useMemo, useState, type CSSProperties } from 'react';
import './LunarBackground.css';

const defaults = { intensity: 40, grainSize: 1, cloudSize: 350, variation: 80, contrast: 1, fade: 250, seed: 32 };
type Settings = typeof defaults;
const controls: { key: keyof Settings; label: string; min: number; max: number; step: number; unit: string }[] = [
  { key: 'intensity', label: 'Интенсивность', min: 0, max: 60, step: 1, unit: '%' },
  { key: 'grainSize', label: 'Размер зерна', min: .5, max: 5, step: .1, unit: '×' },
  { key: 'cloudSize', label: 'Размер крупных пятен', min: 30, max: 600, step: 10, unit: ' px' },
  { key: 'variation', label: 'Неравномерность', min: 0, max: 100, step: 1, unit: '%' },
  { key: 'contrast', label: 'Контраст зерна', min: .5, max: 3, step: .1, unit: '×' },
  { key: 'fade', label: 'Плавность краёв', min: 40, max: 500, step: 10, unit: ' px' },
  { key: 'seed', label: 'Рисунок шума', min: 1, max: 99, step: 1, unit: '' },
];

function initialSettings(): Settings {
  if (!import.meta.env.DEV) return defaults;
  try {
    const saved = JSON.parse(localStorage.getItem('events-grain-settings') || '{}');
    const settings = { ...defaults };
    for (const control of controls) {
      const value = saved?.[control.key];
      if (typeof value === 'number' && Number.isFinite(value)) settings[control.key] = Math.min(control.max, Math.max(control.min, value));
    }
    if (saved?.intensity === undefined) {
      const legacy = localStorage.getItem('events-grain-strength');
      if (legacy !== null && Number.isFinite(Number(legacy))) settings.intensity = Math.min(60, Math.max(0, Number(legacy)));
    }
    return settings;
  } catch { return defaults; }
}

export function LunarBackground() {
  const [settings, setSettings] = useState(initialSettings);
  const { intensity, grainSize, cloudSize, variation, contrast, fade, seed } = settings;
  function update(next: Settings) {
    setSettings(next);
    try { localStorage.setItem('events-grain-settings', JSON.stringify(next)); } catch { /* Controls work without storage. */ }
  }
  const texture = useMemo(() => {
    const mix = variation / 100;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${.78 / grainSize}" numOctaves="3" seed="${seed}" stitchTiles="stitch" result="fine"/><feTurbulence type="fractalNoise" baseFrequency="${1 / cloudSize} ${1.5 / cloudSize}" numOctaves="3" seed="${seed + 26}" stitchTiles="stitch" result="broad"/><feComposite in="fine" in2="broad" operator="arithmetic" k1="${2 * mix}" k2="${1 - mix}" k3="0" k4="0"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/><feFuncG type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/><feFuncB type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/></feComponentTransfer></filter><path fill="white" filter="url(#grain)" d="M0 0h1024v1024H0z"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [grainSize, cloudSize, variation, contrast, seed]);
  return <>
    {import.meta.env.DEV ? <details className="lunar-grain-control" open>
      <summary>Настройка зерна</summary>
      <div className="lunar-grain-sliders">
        {controls.map(control => <div key={control.key}>
          <label htmlFor={`events-grain-${control.key}`}>{control.label}<output htmlFor={`events-grain-${control.key}`}>{settings[control.key]}{control.unit}</output></label>
          <input id={`events-grain-${control.key}`} type="range" min={control.min} max={control.max} step={control.step} value={settings[control.key]} onChange={event => update({ ...settings, [control.key]: Number(event.target.value) })} />
        </div>)}
      </div>
      <button type="button" onClick={() => update({ ...defaults })}>Сбросить настройки</button>
    </details> : null}
    <div className="lunar-background" aria-hidden="true" style={{ '--lunar-grain-opacity': intensity / 100, '--grain-fade': `${fade}px`, '--lunar-grain-texture': texture } as CSSProperties}>
    <div className="lunar-background-orbit" /><div className="lunar-background-orbit" /><div className="lunar-background-orbit" />
    <svg className="lunar-background-moon lunar-background-crescent" viewBox="0 0 100 100" focusable="false">
      <path d="M65 12a40 40 0 1 0 0 76 40 40 0 0 1 0-76Z" fill="currentColor" />
    </svg>
    <svg className="lunar-background-moon lunar-background-full" viewBox="0 0 100 100" focusable="false">
      <circle cx="50" cy="50" r="39" fill="currentColor" />
    </svg>
  </div>
  </>;
}
