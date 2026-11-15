import { useState } from 'react';
import type { Project } from '../../data/projects';
import { AutoShedBlueprint, DigitalKeypadLockBlueprint } from './BlueprintDrawings';

interface ProjectCardFrameProps {
  project: Project;
  isActive: boolean;
  isLight: boolean;
  onClick?: () => void;
}

export function ProjectCardFrame({
  project,
  isActive,
  isLight,
  onClick,
}: ProjectCardFrameProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  // 1. Hardware Blueprints
  if (project.slug === 'auto-shed') {
    return (
      <div
        onClick={onClick}
        className={`w-full h-full rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 flex flex-col ${
          isLight ? 'bg-zinc-100 border-zinc-300' : 'bg-[#0f0f12] border-zinc-800'
        }`}
      >
        <div className="h-6 px-3 border-b flex items-center justify-between text-[10px] font-mono font-bold tracking-wider shrink-0 bg-black/10">
          <span>HARDWARE // BLUEPRINT</span>
          <span className="text-emerald-500">REV.04</span>
        </div>
        <div className="flex-1 w-full min-h-0">
          <AutoShedBlueprint isLight={isLight} />
        </div>
      </div>
    );
  }

  if (project.slug === 'digital-keypad-lock') {
    return (
      <div
        onClick={onClick}
        className={`w-full h-full rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 flex flex-col ${
          isLight ? 'bg-zinc-100 border-zinc-300' : 'bg-[#0f0f12] border-zinc-800'
        }`}
      >
        <div className="h-6 px-3 border-b flex items-center justify-between text-[10px] font-mono font-bold tracking-wider shrink-0 bg-black/10">
          <span>EMBEDDED // SCHEMATIC</span>
          <span className="text-emerald-500">ATMEGA328P</span>
        </div>
        <div className="flex-1 w-full min-h-0">
          <DigitalKeypadLockBlueprint isLight={isLight} />
        </div>
      </div>
    );
  }

  // 2. Mobile Phone Bezel (LoveConnect)
  if (project.kind === 'mobile') {
    return (
      <div
        onClick={onClick}
        className={`w-full h-full max-w-[280px] mx-auto rounded-[2.2rem] p-2.5 border-4 shadow-2xl transition-all duration-300 flex flex-col items-center justify-between ${
          isLight
            ? 'bg-zinc-200 border-zinc-400 shadow-zinc-300/60'
            : 'bg-zinc-900 border-zinc-700 shadow-black'
        }`}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="w-20 h-3.5 bg-black rounded-full mb-1.5 shrink-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-zinc-800 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
        </div>

        {/* Screen */}
        <div className="relative w-full flex-1 rounded-[1.6rem] overflow-hidden bg-black flex items-center justify-center">
          {project.assets.hero && (
            <img
              src={project.assets.hero}
              alt={project.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isActive && isVideoReady && project.assets.video ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          {isActive && project.assets.video && (
            <video
              src={project.assets.video}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setIsVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Home Indicator Bar */}
        <div className="w-24 h-1 bg-zinc-500/50 rounded-full mt-2 shrink-0" />
      </div>
    );
  }

  // 3. Kiosk Bezel (V Notice)
  if (project.kind === 'kiosk') {
    return (
      <div
        onClick={onClick}
        className={`w-full h-full rounded-2xl p-2.5 border-4 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
          isLight
            ? 'bg-zinc-200 border-zinc-400'
            : 'bg-zinc-900 border-zinc-700'
        }`}
      >
        {/* Kiosk Header */}
        <div className="h-5 px-2 flex items-center justify-between text-[9px] font-mono tracking-widest text-zinc-400 shrink-0">
          <span>KIOSK // 800x480</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            STANDALONE
          </span>
        </div>

        {/* Screen */}
        <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-black flex items-center justify-center">
          {project.assets.hero && (
            <img
              src={project.assets.hero}
              alt={project.title}
              className={`w-full h-full object-contain transition-opacity duration-500 ${
                isActive && isVideoReady && project.assets.video ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}
          {isActive && project.assets.video && (
            <video
              src={project.assets.video}
              autoPlay
              loop
              muted
              playsInline
              onCanPlay={() => setIsVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                isVideoReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Kiosk Footer Bezel */}
        <div className="h-4 px-2 flex items-center justify-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">
          RASPBERRY PI · OFFLINE FIRST ENGINE
        </div>
      </div>
    );
  }

  // 4. Default Web Browser Chrome
  return (
    <div
      onClick={onClick}
      className={`w-full h-full rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 flex flex-col ${
        isLight
          ? 'bg-white border-zinc-300'
          : 'bg-[#121216] border-zinc-800'
      }`}
    >
      {/* Browser Chrome Header */}
      <div
        className={`h-8 border-b px-3.5 flex items-center gap-3 shrink-0 ${
          isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'
        }`}
      >
        {/* 3 Window Control Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Address Bar Pill */}
        <div
          className={`px-3 py-0.5 rounded-md text-[10px] font-mono tracking-wider truncate max-w-[240px] flex items-center gap-1.5 ${
            isLight ? 'bg-white text-zinc-700 border border-zinc-200' : 'bg-zinc-800 text-zinc-300'
          }`}
        >
          <span className="text-zinc-500">https://</span>
          <span>{project.slug}.internal</span>
        </div>
      </div>

      {/* Media Screen Viewport */}
      <div className="relative w-full flex-1 overflow-hidden bg-black/90 flex items-center justify-center">
        {project.assets.hero && (
          <img
            src={project.assets.hero}
            alt={project.title}
            className={`w-full h-full object-contain transition-opacity duration-500 ${
              isActive && isVideoReady && project.assets.video ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}
        {isActive && project.assets.video && (
          <video
            src={project.assets.video}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </div>
  );
}

