import { useState, useEffect } from 'react';
import * as THREE from 'three';

const textureCache = new Map<string, THREE.Texture>();

// Create a 1x1 neutral fallback canvas texture
function createFallbackTexture(color = '#18181b'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 64, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const fallbackTexture = createFallbackTexture();

export function useSafeTexture(url?: string): THREE.Texture {
  const [texture, setTexture] = useState<THREE.Texture>(() => {
    if (!url) return fallbackTexture;
    return textureCache.get(url) || fallbackTexture;
  });

  useEffect(() => {
    if (!url) {
      setTexture(fallbackTexture);
      return;
    }

    if (textureCache.has(url)) {
      setTexture(textureCache.get(url)!);
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (loadedTex) => {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.minFilter = THREE.LinearFilter;
        loadedTex.generateMipmaps = true;
        textureCache.set(url, loadedTex);
        setTexture(loadedTex);
      },
      undefined,
      (err) => {
        console.warn(`[3D] Failed to load texture: ${url}`, err);
        setTexture(fallbackTexture);
      }
    );
  }, [url]);

  return texture;
}

export function useActiveVideoTexture(videoUrl?: string, isActive = false): THREE.Texture | null {
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (!videoUrl || !isActive) {
      if (videoTexture) {
        // Pause and cleanup
        const video = videoTexture.image as HTMLVideoElement;
        if (video) video.pause();
      }
      return;
    }

    let active = true;
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    const tex = new THREE.VideoTexture(video);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    video.play().then(() => {
      if (active) {
        setVideoTexture(tex);
      }
    }).catch((err) => {
      console.warn(`[3D] Video autoplay blocked or failed for: ${videoUrl}`, err);
    });

    return () => {
      active = false;
      video.pause();
      video.removeAttribute('src');
      video.load();
      tex.dispose();
      setVideoTexture(null);
    };
  }, [videoUrl, isActive]);

  return videoTexture;
}
