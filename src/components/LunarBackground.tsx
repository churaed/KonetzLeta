import type { CSSProperties } from 'react';
import './LunarBackground.css';

// Approved texture settings.
const intensity = 40, grainSize = 1, cloudSize = 350, variation = 80, contrast = 1, fade = 250, seed = 32;
const texture = (() => {
    const mix = variation / 100;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${.78 / grainSize}" numOctaves="3" seed="${seed}" stitchTiles="stitch" result="fine"/><feTurbulence type="fractalNoise" baseFrequency="${1 / cloudSize} ${1.5 / cloudSize}" numOctaves="3" seed="${seed + 26}" stitchTiles="stitch" result="broad"/><feComposite in="fine" in2="broad" operator="arithmetic" k1="${2 * mix}" k2="${1 - mix}" k3="0" k4="0"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/><feFuncG type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/><feFuncB type="linear" slope="${contrast}" intercept="${.5 * (1 - contrast)}"/></feComponentTransfer></filter><path fill="white" filter="url(#grain)" d="M0 0h1024v1024H0z"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

export function LunarBackground() {
  return (
    <div className="lunar-background" aria-hidden="true" style={{ '--lunar-grain-opacity': intensity / 100, '--grain-fade': `${fade}px`, '--lunar-grain-texture': texture } as CSSProperties}>
    <div className="lunar-background-orbit" /><div className="lunar-background-orbit" /><div className="lunar-background-orbit" />
    <svg className="lunar-background-moon lunar-background-crescent" viewBox="0 0 100 100" focusable="false">
      <path d="M65 12a40 40 0 1 0 0 76 40 40 0 0 1 0-76Z" fill="currentColor" />
    </svg>
    <svg className="lunar-background-moon lunar-background-full" viewBox="0 0 100 100" focusable="false">
      <circle cx="50" cy="50" r="39" fill="currentColor" />
    </svg>
  </div>
  );
}
