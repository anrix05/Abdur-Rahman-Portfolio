# Product Requirements Document (PRD v3) - 3D Scroll-Driven Portfolio Upgrade

**Author:** Abdur Rahman  
**Role:** Full-Stack & Mobile Developer (Mumbai, India)  
**Branch:** `3d-redesign`  
**Date:** November 2026  
**Status:** Completed & Verified

---

## 1. Executive Summary

This release completely elevates the portfolio into a tactile, scroll-driven 3D experience while preserving its brutalist-editorial DNA: strict monochrome black (`#000`) and ivory (`#fafafa`) foundations, zinc borders, stretched Syne display typography, JetBrains Mono labels, Plus Jakarta Sans body, 24px card radii, and a high-contrast B/W theme toggle.

The marquee reel in `Projects.tsx` has been replaced with a scroll-pinned 3D showcase powered by GSAP ScrollTrigger and React Three Fiber (R3F), featuring custom procedural 3D models for each project kind (Web floating browser, Smartphone, Kiosk hardware stand, and procedural IoT/Embedded mechanics).

---

## 2. Architecture & Technology Stack

- **Framework:** React 19, Vite 7, TypeScript
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **3D & WebGL:** Three.js (0.182.0), `@react-three/fiber` (9.5.0), `@react-three/drei` (10.7.7)
- **Animation & Scroll Pinning:** GSAP 3.14.2 + ScrollTrigger, Framer Motion 12.34.0
- **Smooth Scroll:** Lenis 1.3.17 driven synchronously via `gsap.ticker`
- **Asset Formats:** Next-gen WebP image stills, VP9/H.264 WebM/MP4 interactive screen video captures

---

## 3. Project Showcase & Model Architecture

Each project has a dedicated 3D object tailored to its real-world medium:

| Project | Medium / Kind | 3D Model Representation | Accent Color | Key Features & Textures |
| :--- | :--- | :--- | :--- | :--- |
| **NexaLink** | Web App | Floating Browser Panel | `#10b981` | Chrome header, 3 dots, active video loop (`demo.mp4`), SIH25017 |
| **V Notice** | Kiosk Display | 800×480 Kiosk Hardware | `#d97706` | Metallic pedestal stand, status LED, Raspberry Pi dual-server preview |
| **AttendAI** | AI / Dashboard | Floating Browser Panel | `#3b4cd3` | Multimodal Gemini computer vision register review |
| **ZeroBlur** | Web App | Floating Browser Panel | `#ffe17c` | Neo-Brutalist marketplace, physical preview drawer |
| **The Graveyard** | Web App | Floating Browser Panel | `#6c1717` | Editorial dark tombstone listing, Razorpay escrow |
| **LoveConnect** | Mobile App | 3D Smartphone Chassis | `#ff6b9d` | Dynamic island, camera notch, side buttons, biometric app mockup |
| **CampusMind** | Timetable Engine | Floating Browser Panel | `#edbd7f` | FastAPI + SQLite schedule grid, live SVG conflict graph replay |
| **Auto Shed** | Hardware / IoT | Motorized Sliding Roof | `#0284c7` | Procedural pergola frame, motorized sliding slats, animated rain particles |
| **Keypad Lock** | Hardware / Embedded | Matrix Access Enclosure | `#10b981` | Machined chassis, 4×4 tactile keys with animated depression, dual status LED |

---

## 4. Interaction Model & Navigation

1. **Scroll-Driven Pinning:**
   - Section container spans `450vh`.
   - GSAP ScrollTrigger pins the viewport stage (`sticky top-0`) and scrubs smoothly through the 9 stages.
   - Snapping points are set to `1 / (N - 1)` so the camera smoothly settles on each project stage.
2. **Keyboard & Drag Controls:**
   - Arrow keys (`ArrowLeft` / `ArrowRight`) advance or reverse between projects and smoothly sync scroll offset.
   - Pointer dragging on the canvas calculates horizontal delta to switch between projects.
3. **DOM Overlaid Typography:**
   - Titles are rendered as sharp DOM text using stretched Syne display font (`[clamp(2rem,6vw,5.5rem)]`) rather than WebGL text, guaranteeing crisp rendering, full accessibility, and instant selection.
   - Transition between active titles uses Framer Motion spring physics.
4. **Interactive Detail Modal (`ProjectModal.tsx`):**
   - Clicking any project stage or "CASE STUDY" button opens an interactive modal with focus trap and Escape key listener.
   - Includes full-screen video player (`demo.mp4`), interactive screenshot thumbnails (`screen-1.webp`..`screen-4.webp`), Case Study facts (Problem, Solution, Outcome), tech stack tags, and external action links (`target="_blank"` and `rel="noopener noreferrer"`).
5. **3D / Bento Grid Toggle:**
   - A switcher toggle in the top-right allows instant switching between the 3D scroll-pinned showcase and a curated responsive Bento Grid.
   - Mobile viewports (< 768px) and users with `prefers-reduced-motion` default automatically to the Bento Grid for zero-clutter readability.

---

## 5. Site-Wide 3D Touchpoints

- **Hero (`HeroCluster.tsx`):** Ambient floating 3D geometry cluster (nested wireframe torus rings, satellite cubes, and icosahedron) tracking cursor parallax.
- **About (`TiltCard.tsx`):** Interactive 3D CSS perspective card tilt on the bio editor and editorial cards with depth layers (`translateZ`).
- **Skills:** 3D hover tilt on all technical stack category cards.
- **Experience:** Timeline cards feature a scroll-linked 3D depth transform (`rotateX`, `translateZ`, `scale`) that unfolds as cards enter the viewport.
- **Contact (`ContactGlobe.tsx`):** Faint wireframe 3D globe and orbital coordinate ring.
- **Cursor (`Cursor.tsx`):** Trailing follower dynamically expands and displays `"VIEW"` over project stages, and `"DRAG"` over the 3D canvas background.

---

## 6. Performance & Resilience Strategies

1. **Single Active WebGL Context Rule:**
   - `HeroCluster` and `ContactGlobe` use `IntersectionObserver` to halt their render loops and unmount when scrolled out of view, ensuring only one active WebGL context renders on screen at any time.
2. **Device Pixel Ratio (DPR) Clamping:**
   - Clamped to `dpr={[1, 1.5]}` across all canvases to prevent GPU exhaustion on Retina displays.
3. **Lazy Bundle Splitting:**
   - Three.js, R3F, and Drei are split into a dedicated `vendor-three` chunk (gzipped ~295 kB).
   - `ProjectCanvas`, `HeroCluster`, and `ContactGlobe` are loaded dynamically via `React.lazy` and `Suspense`.
4. **Video Texture Memory Lifecycle:**
   - Videos are instantiated with `THREE.VideoTexture` only when the project is active. Deactivating a project pauses, unloads, and disposes the video texture.
5. **Accessibility Fallback:**
   - A visually hidden semantic DOM list (`<ul className="sr-only">`) lists all 9 projects with links and descriptions for screen readers and SEO crawlers.

---

## 7. Verification & Test Report

- **TypeScript Build:** `tsc -b && vite build` passed with zero errors.
- **Playwright Automated Verification:**
  - Desktop 1440×900 Dark Theme: Verified hero cluster, 3D stage layout, modal interaction, escape close, and grid toggle.
  - Desktop 1440×900 Light Theme: Verified theme consistency, high contrast readability, and lighting.
  - Mobile 390×844: Verified default Bento Grid fallback, zero horizontal overflow, and clean touch navigation.
  - Console Errors: `0` errors logged.

