import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

export default function Preloader({ onFinish }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Central Glowing Energy Orb (Core + Glow shell)
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const coreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // Inner fiery dense sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    orbGroup.add(innerMesh);

    // Center bright core
    const centerPointGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const centerPointMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const centerPoint = new THREE.Mesh(centerPointGeo, centerPointMat);
    orbGroup.add(centerPoint);

    // 2. Orbiting Satellite Particles (800 particles in orbital disc)
    const orbitParticleCount = 800;
    const orbitPositions = new Float32Array(orbitParticleCount * 3);
    const orbitAngles = new Float32Array(orbitParticleCount);
    const orbitRadii = new Float32Array(orbitParticleCount);
    const orbitSpeeds = new Float32Array(orbitParticleCount);

    for (let i = 0; i < orbitParticleCount; i++) {
      const radius = 1.3 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      orbitRadii[i] = radius;
      orbitAngles[i] = angle;
      orbitSpeeds[i] = (0.5 + Math.random() * 1.5) * (Math.random() > 0.5 ? 1 : -1);

      orbitPositions[i * 3] = Math.cos(angle) * radius;
      orbitPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // slight vertical spread
      orbitPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const orbitGeometry = new THREE.BufferGeometry();
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));

    const orbitMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const orbitPoints = new THREE.Points(orbitGeometry, orbitMaterial);
    orbGroup.add(orbitPoints);

    // 3. Explosion Particles (2,500 particles, dormant until 100%)
    const explosionCount = 2500;
    const explosionPositions = new Float32Array(explosionCount * 3);
    const explosionVelocities = new Float32Array(explosionCount * 3);
    const explosionColors = new Float32Array(explosionCount * 3);

    const cyanCol = new THREE.Color(0x38bdf8);
    const violetCol = new THREE.Color(0xa855f7);
    const whiteCol = new THREE.Color(0xffffff);

    for (let i = 0; i < explosionCount; i++) {
      explosionPositions[i * 3] = 0;
      explosionPositions[i * 3 + 1] = 0;
      explosionPositions[i * 3 + 2] = 0;

      // Spherical explosion direction
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 4.0 + Math.random() * 9.0;

      explosionVelocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      explosionVelocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      explosionVelocities[i * 3 + 2] = speed * Math.cos(phi);

      const colorPick = Math.random();
      const chosenColor = colorPick > 0.6 ? cyanCol : colorPick > 0.3 ? violetCol : whiteCol;
      explosionColors[i * 3] = chosenColor.r;
      explosionColors[i * 3 + 1] = chosenColor.g;
      explosionColors[i * 3 + 2] = chosenColor.b;
    }

    const explosionGeometry = new THREE.BufferGeometry();
    explosionGeometry.setAttribute('position', new THREE.BufferAttribute(explosionPositions, 3));
    explosionGeometry.setAttribute('color', new THREE.BufferAttribute(explosionColors, 3));

    const explosionMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });

    const explosionPoints = new THREE.Points(explosionGeometry, explosionMaterial);
    scene.add(explosionPoints);

    // Timing and Animation State
    const startTime = performance.now();
    const duration = 2200; // 2.2s loading to 100%
    let animationFrameId;
    let explodingTriggered = false;
    let explosionStartTime = 0;

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(1, elapsed / duration);
      const currentPct = Math.floor(progressFraction * 100);
      setProgress(currentPct);

      // Camera slowly zooms toward orb
      camera.position.z = 7 - progressFraction * 3.2;

      // Rotate Orb with increasing energy
      orbGroup.rotation.y += 0.015 + progressFraction * 0.03;
      orbGroup.rotation.x += 0.008;

      // Update orbiting satellites
      const positions = orbitGeometry.attributes.position.array;
      for (let i = 0; i < orbitParticleCount; i++) {
        orbitAngles[i] += orbitSpeeds[i] * 0.02;
        positions[i * 3] = Math.cos(orbitAngles[i]) * orbitRadii[i];
        positions[i * 3 + 2] = Math.sin(orbitAngles[i]) * orbitRadii[i];
      }
      orbitGeometry.attributes.position.needsUpdate = true;

      // At 100%, trigger explosion
      if (currentPct === 100 && !explodingTriggered) {
        explodingTriggered = true;
        setIsExploding(true);
        explosionStartTime = currentTime;
        orbGroup.visible = false; // dissolve central orb
        explosionMaterial.opacity = 1.0;
      }

      // Render explosion physics
      if (explodingTriggered) {
        const explosionElapsed = (currentTime - explosionStartTime) / 1000;
        const expPositions = explosionGeometry.attributes.position.array;

        for (let i = 0; i < explosionCount; i++) {
          expPositions[i * 3] += explosionVelocities[i * 3] * 0.016;
          expPositions[i * 3 + 1] += explosionVelocities[i * 3 + 1] * 0.016;
          expPositions[i * 3 + 2] += explosionVelocities[i * 3 + 2] * 0.016;
        }
        explosionGeometry.attributes.position.needsUpdate = true;
        explosionMaterial.opacity = Math.max(0, 1.0 - explosionElapsed * 1.2);

        // After explosion completes, end preloader
        if (explosionElapsed > 0.8 && !isFinished) {
          setIsFinished(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 400);
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      explosionGeometry.dispose();
      explosionMaterial.dispose();
    };
  }, [onFinish, isFinished]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Three.js Canvas Container */}
          <div ref={mountRef} className="absolute inset-0" />

          {/* HUD Overlay around the Orb */}
          {!isExploding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              {/* Radial Percentage Ring */}
              <div className="relative w-52 h-52 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="104"
                    cy="104"
                    r="92"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="104"
                    cy="104"
                    r="92"
                    stroke="url(#preloaderGradient)"
                    strokeWidth="3.5"
                    strokeDasharray={2 * Math.PI * 92}
                    strokeDashoffset={2 * Math.PI * 92 * (1 - progress / 100)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-75"
                  />
                  <defs>
                    <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Percentage Display */}
                <div className="flex flex-col items-center">
                  <span className="font-display font-black text-4xl text-white tracking-tighter drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]">
                    {progress}%
                  </span>
                  <span className="text-[9px] font-mono text-cyan-300 tracking-widest uppercase mt-1">
                    SYNTHESIZING WORLD
                  </span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>INITIALIZING SHALINI THUMMANAPALLY ARCHITECTURE</span>
              </div>
            </motion.div>
          )}

          {/* Shockwave Flash when exploding */}
          {isExploding && (
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute w-96 h-96 rounded-full bg-cyan-400/30 blur-2xl pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
