"use client";

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

interface ImageItem {
  src: string;
  alt: string;
}

interface DomeGalleryProps {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
}

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = (el as HTMLElement & { dataset: DOMStringMap }).dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) return coords.map(c => ({ ...c, src: '', alt: '' }));

  const usedImages = Array.from({ length: totalSlots }, (_, i) => pool[i % pool.length]);

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]; usedImages[i] = usedImages[j]; usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({ ...c, src: usedImages[i].src, alt: usedImages[i].alt }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  return { rotateX: unit * (offsetY - (sizeY - 1) / 2), rotateY: unit * (offsetX + (sizeX - 1) / 2) };
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#09090b',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '12px',
  openedImageBorderRadius = '16px',
  grayscale = false,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<DOMRect | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef('mouse');
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
      const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case 'min': basis = minDim; break;
        case 'max': basis = maxDim; break;
        case 'width': basis = w; break;
        case 'height': basis = h; break;
        default: basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      radius = Math.min(radius, h * 1.35);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);
      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      const circ = lockedRadiusRef.current * Math.PI;
      const itemUnit = circ / segments;
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--circ', `${circ}px`);
      root.style.setProperty('--item-width', `${itemUnit}px`);
      root.style.setProperty('--item-height', `${itemUnit}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius]);

  useEffect(() => { applyTransform(rotationRef.current.x, rotationRef.current.y); }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null; }
  }, []);

  const startInertia = useCallback((vx: number, vy: number) => {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const d = clamp(dragDampening ?? 0.6, 0, 1);
    const frictionMul = 0.94 + 0.055 * d;
    const stopThreshold = 0.015 - 0.01 * d;
    const maxFrames = Math.round(90 + 270 * d);
    const step = () => {
      vX *= frictionMul; vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) { inertiaRAF.current = null; return; }
      if (++frames > maxFrames) { inertiaRAF.current = null; return; }
      const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

  const openItemFromElement = useCallback((el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;

    const offsetX = getDataNumber(parent, 'offsetX', 0);
    const offsetY = getDataNumber(parent, 'offsetY', 0);
    const sizeX = getDataNumber(parent, 'sizeX', 2);
    const sizeY = getDataNumber(parent, 'sizeY', 2);

    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;

    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference';
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    refDiv.style.opacity = '0';
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0) {
      openingRef.current = false; focusedElRef.current = null; parent.removeChild(refDiv); unlockScroll(); return;
    }

    originalTilePositionRef.current = tileR;
    el.style.visibility = 'hidden'; el.style.zIndex = '0';

    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.cssText = `position:absolute;left:${frameR.left - mainR.left}px;top:${frameR.top - mainR.top}px;width:${frameR.width}px;height:${frameR.height}px;opacity:0;z-index:30;transition:transform ${enlargeTransitionMs}ms ease,opacity ${enlargeTransitionMs}ms ease;border-radius:${openedImageBorderRadius};overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);`;

    const img = document.createElement('img');
    img.src = parent.dataset.src || el.querySelector('img')?.src || '';
    img.alt = parent.dataset.alt || el.querySelector('img')?.alt || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    img.style.filter = grayscale ? 'grayscale(1)' : 'none';
    overlay.appendChild(img);
    viewerRef.current!.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;
    overlay.style.transform = `translate(${tx0}px,${ty0}px) scale(${sx0 || 1},${sy0 || 1})`;

    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0,0) scale(1,1)';
      rootRef.current?.setAttribute('data-enlarging', 'true');
    }, 16);
  }, [enlargeTransitionMs, grayscale, lockScroll, openedImageBorderRadius, segments, unlockScroll]);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        pointerTypeRef.current = (event as PointerEvent).pointerType || 'mouse';
        if (pointerTypeRef.current === 'touch') { (event as Event).preventDefault(); lockScroll(); }
        draggingRef.current = true; cancelTapRef.current = false; movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: (event as PointerEvent).clientX, y: (event as PointerEvent).clientY };
        tapTargetRef.current = (event.target as HTMLElement).closest?.('.item__image') as HTMLElement | null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        if (pointerTypeRef.current === 'touch') (event as Event).preventDefault();

        const dxTotal = (event as PointerEvent).clientX - startPosRef.current.x;
        const dyTotal = (event as PointerEvent).clientY - startPosRef.current.y;

        if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true;

        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);

        if (last) {
          draggingRef.current = false;
          const dx = (event as PointerEvent).clientX - startPosRef.current.x;
          const dy = (event as PointerEvent).clientY - startPosRef.current.y;
          const TAP = pointerTypeRef.current === 'touch' ? 10 : 6;
          const isTap = dx * dx + dy * dy <= TAP * TAP;

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX, vy = vMagY * dirY;
          if (!isTap && Math.abs(vx) < 0.001 && Array.isArray(movement)) {
            vx = (movement[0] / dragSensitivity) * 0.02;
            vy = (movement[1] / dragSensitivity) * 0.02;
          }
          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) startInertia(vx, vy);

          startPosRef.current = null;
          cancelTapRef.current = !isTap;
          if (isTap && tapTargetRef.current && !focusedElRef.current) openItemFromElement(tapTargetRef.current);
          tapTargetRef.current = null;
          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
          if (pointerTypeRef.current === 'touch') unlockScroll();
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;
      if (!overlay) return;
      overlay.remove();
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      el.style.visibility = ''; el.style.zIndex = '0';
      focusedElRef.current = null;
      rootRef.current?.removeAttribute('data-enlarging');
      openingRef.current = false;
    };
    scrim.addEventListener('click', close);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { scrim.removeEventListener('click', close); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => () => { document.body.classList.remove('dg-scroll-lock'); }, []);

  const css = `
    .sphere-root{
      --radius:520px;
      --viewer-pad:72px;
      --circ:calc(var(--radius)*3.14);
      --rot-y:calc((360deg / var(--segments-x)) / 2);
      --rot-x:calc((360deg / var(--segments-y)) / 2);
      --item-width:calc(var(--circ)/var(--segments-x));
      --item-height:calc(var(--circ)/var(--segments-y));
    }
    .sphere-root *{box-sizing:border-box;}
    .sphere,.sphere-item,.item__image{transform-style:preserve-3d;}
    .stage{width:100%;height:100%;display:grid;place-items:center;position:absolute;inset:0;margin:auto;perspective:calc(var(--radius)*2);perspective-origin:50% 50%;}
    .sphere{transform:translateZ(calc(var(--radius)*-1));will-change:transform;position:absolute;}
    .sphere-item{
      width:calc(var(--item-width)*var(--item-size-x));
      height:calc(var(--item-height)*var(--item-size-y));
      position:absolute;
      top:-999px;bottom:-999px;left:-999px;right:-999px;
      margin:auto;
      transform-origin:50% 50%;
      backface-visibility:hidden;
      transition:transform 300ms;
      transform:
        rotateY(calc(var(--rot-y)*(var(--offset-x)+((var(--item-size-x)-1)/2))+var(--rot-y-delta,0deg)))
        rotateX(calc(var(--rot-x)*(var(--offset-y)-((var(--item-size-y)-1)/2))+var(--rot-x-delta,0deg)))
        translateZ(var(--radius));
    }
    .sphere-root[data-enlarging="true"] .scrim{opacity:1!important;pointer-events:all!important;}
    .item__image{position:absolute;inset:10px;border-radius:var(--tile-radius,12px);overflow:hidden;cursor:pointer;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform 300ms;pointer-events:auto;}
    .item__image--reference{position:absolute;inset:10px;pointer-events:none;}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full"
        style={{
          ['--segments-x' as string]: segments,
          ['--segments-y' as string]: segments,
          ['--rot-y' as string]: `${360 / segments / 2}deg`,
          ['--rot-x' as string]: `${360 / segments / 2}deg`,
        }}
      >
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{ touchAction: 'none', WebkitUserSelect: 'none' }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={{
                    ['--offset-x' as string]: it.x,
                    ['--offset-y' as string]: it.y,
                    ['--item-size-x' as string]: it.sizeX,
                    ['--item-size-y' as string]: it.sizeY,
                  }}
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={it.alt || 'Brand logo'}
                    onClick={e => {
                      if (draggingRef.current || movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80) return;
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    style={{ inset: '10px', borderRadius: `var(--tile-radius, ${imageBorderRadius})`, backfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ backfaceVisibility: 'hidden', filter: `var(--image-filter, ${grayscale ? 'grayscale(1)' : 'none'})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(rgba(235,235,235,0) 65%, ${overlayBlurColor} 100%)` }} />
          <div className="absolute inset-0 m-auto z-[3] pointer-events-none"
            style={{ WebkitMaskImage: `radial-gradient(rgba(235,235,235,0) 70%, ${overlayBlurColor} 90%)`, maskImage: `radial-gradient(rgba(235,235,235,0) 70%, ${overlayBlurColor} 90%)`, backdropFilter: 'blur(3px)' }} />
          <div className="absolute left-0 right-0 top-0 h-[120px] z-[5] pointer-events-none rotate-180"
            style={{ background: `linear-gradient(to bottom, transparent, ${overlayBlurColor})` }} />
          <div className="absolute left-0 right-0 bottom-0 h-[120px] z-[5] pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${overlayBlurColor})` }} />

          <div ref={viewerRef} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ padding: 'var(--viewer-pad)' }}>
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)' }}
            />
            <div ref={frameRef} className="viewer-frame h-full aspect-square flex"
              style={{ borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})` }} />
          </div>
        </main>
      </div>
    </>
  );
}
