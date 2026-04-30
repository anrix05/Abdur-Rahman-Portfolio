import type { HyperspeedOptions } from './Hyperspeed';

export const hyperspeedPresets: Record<string, HyperspeedOptions> = {
  one: {
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    colors: {
      roadColor: 0x0c0c0c,
      islandColor: 0x0c0c0c,
      background: 0x0c0c0c,
      shoulderLines: 0x222222,
      brokenLines: 0x222222,
      leftCars: [0xccff00, 0xaaff00, 0xccff00],
      rightCars: [0x10b981, 0x059669, 0x34d399],
      sticks: 0xccff00
    }
  },
  two: {
    distortion: 'mountainDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    colors: {
      roadColor: 0x0c0c0c,
      islandColor: 0x0c0c0c,
      background: 0x0c0c0c,
      shoulderLines: 0x222222,
      brokenLines: 0x222222,
      leftCars: [0xccff00, 0xccff00, 0xccff00],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xccff00
    }
  }
};
