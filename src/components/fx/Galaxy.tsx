"use client";

/**
 * Galaxy — WebGL starfield background: layered, twinkling stars drifting
 * toward the viewer, with a gentle cursor parallax / repulsion. Made for
 * the dark night-sky hero.
 *
 * Source:  React Bits — https://github.com/DavidHDev/react-bits
 *          src/ts-tailwind/Backgrounds/Galaxy/Galaxy.tsx
 * License: MIT + Commons Clause, (c) David Haz. Free to use as part of a
 *          website/product; the component itself may not be sold or
 *          redistributed on its own.
 * Deps:    ogl (Unlicense), a small WebGL helper.
 * Changes: shaders verbatim. Component: decorative + aria-hidden; renders
 *          only while on screen and the tab is visible (IntersectionObserver
 *          + visibilitychange); ResizeObserver instead of window resize;
 *          array props compared by value (no WebGL context rebuild on every
 *          parent render); fails silently (CSS fallback shows) when WebGL
 *          is unavailable; `dpr` cap; prefers-reduced-motion draws one still
 *          frame and ignores the cursor; `maxFps` cap (default 30) and an
 *          adaptive fallback to a still frame on devices that can't keep up. Cursor tracked on window so it works
 *          under overlaid hero content. Light-mode branch left in the
 *          shader but always off.
 */
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { cn } from "./cn";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform float uLightMode;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uLightMode > 0.5) {
    float energy = max(max(col.r, col.g), col.b);
    float coverage = clamp(smoothstep(0.0, 0.42, energy) * 0.92, 0.0, 0.92);
    vec3 ink = clamp(col * 0.48, 0.0, 0.82);
    gl_FragColor = vec4(mix(vec3(1.0), ink, coverage), 1.0);
  } else if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export interface GalaxyProps {
  /** focal point, 0–1 in each axis */
  focal?: [number, number];
  /** [cos, sin] of a fixed rotation */
  rotation?: [number, number];
  starSpeed?: number;
  density?: number;
  /** degrees; tints the star colours */
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
  /** device-pixel-ratio cap; 1 is cheapest, stars are soft anyway */
  dpr?: number;
  /** frame-rate cap (0 = uncapped); 30 halves GPU work and still looks smooth */
  maxFps?: number;
  /** freeze to a still frame on devices that can't hold ~12 fps */
  adaptive?: boolean;
  className?: string;
}

export function Galaxy({
  focal = [0.5, 0.5],
  rotation = [1.0, 0.0],
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  dpr = 1,
  maxFps = 30,
  adaptive = true,
  className,
}: GalaxyProps) {
  const reduce = usePrefersReducedMotion();
  const ctnDom = useRef<HTMLDivElement>(null);
  const [fx, fy] = focal;
  const [rx, ry] = rotation;
  const still = disableAnimation || reduce;
  const interactive = mouseInteraction && !reduce;

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false, dpr: Math.min(dpr, window.devicePixelRatio || 1) });
    } catch {
      return; // no WebGL — leave the container's CSS background showing
    }
    const gl = renderer.gl;
    if (!gl) return;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.clearColor(0, 0, 0, 1);
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        uFocal: { value: new Float32Array([fx, fy]) },
        uRotation: { value: new Float32Array([rx, ry]) },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSpeed: { value: speed },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uMouseRepulsion: { value: mouseRepulsion },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uTransparent: { value: transparent },
        uLightMode: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctn.appendChild(canvas);

    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    let targetActive = 0;
    let smoothActive = 0;

    const draw = (t: number) => {
      if (!still) {
        program.uniforms.uTime.value = t * 0.001;
        program.uniforms.uStarSpeed.value = (t * 0.001 * starSpeed) / 10.0;
      }
      const k = 0.05;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * k;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * k;
      smoothActive += (targetActive - smoothActive) * k;
      program.uniforms.uMouse.value[0] = smoothMouse.x;
      program.uniforms.uMouse.value[1] = smoothMouse.y;
      program.uniforms.uMouseActiveFactor.value = smoothActive;
      renderer.render({ scene: mesh });
    };

    const resize = () => {
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      program.uniforms.uResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      if (still) draw(0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(ctn);

    // Render loop runs only while visible on screen and in a visible tab,
    // optionally capped to `maxFps`. If the device clearly can't keep up
    // (software WebGL, very weak GPU: < 12 fps over the first 1.5 s) it
    // drops to a single still frame so the rest of the page stays smooth.
    let raf = 0;
    let onScreen = true;
    let degraded = false;
    let lastDraw = -Infinity;
    let probeStart = -1;
    let probeFrames = 0;
    const minInterval = maxFps > 0 ? 1000 / maxFps : 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (probeStart < 0) probeStart = t;
      probeFrames++;
      if (adaptive && Number.isFinite(probeStart) && t - probeStart > 1500) {
        if ((probeFrames * 1000) / (t - probeStart) < 12) {
          degraded = true;
          cancelAnimationFrame(raf);
          raf = 0;
          return;
        }
        probeStart = Number.POSITIVE_INFINITY; // probe done, keep running
      }
      if (t - lastDraw < minInterval - 1) return;
      lastDraw = t;
      draw(t);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (Number.isFinite(probeStart)) {
        // restart an unfinished probe so paused time isn't counted as slowness
        probeStart = -1;
        probeFrames = 0;
      }
      if (still || degraded) {
        draw(0);
        return;
      }
      if (onScreen && document.visibilityState === "visible") raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(ctn);
    document.addEventListener("visibilitychange", sync);
    sync();

    // Listen on window so the effect still tracks when hero content sits on
    // top of the canvas (backgrounds are usually covered by other layers).
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      targetActive = inside ? 1.0 : 0.0;
      if (inside) {
        targetMouse.x = x;
        targetMouse.y = 1.0 - y;
      }
    };
    if (interactive) window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas.parentNode === ctn) ctn.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    fx,
    fy,
    rx,
    ry,
    starSpeed,
    density,
    hueShift,
    still,
    speed,
    interactive,
    glowIntensity,
    saturation,
    mouseRepulsion,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    transparent,
    dpr,
    maxFps,
    adaptive,
  ]);

  return <div ref={ctnDom} aria-hidden="true" className={cn("relative h-full w-full", className)} />;
}

export default Galaxy;
