import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Interactive Real-Time 3D WebGL Canvas for Project Cards
 * Types:
 * - 'cube': 3D Glossy AI Automation Cube with floating orbital rings (Instagram AI)
 * - 'orb': 3D Holographic Audio Sphere with soundwave rings (LiveMeet Translate)
 * - 'vault': 3D Cybernetic Isometric Engine Core with floating crystal shards (Apex Banking)
 */
export default function Project3DCard({ type = 'cube', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 340;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group to hold all 3D meshes for mouse tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    let rimLight, accentLight;

    // Objects depending on type
    const animObjects = [];

    if (type === 'jobagent') {
      // 1. JOBAGENT.AI: 3D Autonomous AI Agent Neural Core + Floating Data Nodes
      rimLight = new THREE.PointLight(0x06b6d4, 4, 10);
      rimLight.position.set(-3, 3, 2);
      scene.add(rimLight);

      accentLight = new THREE.PointLight(0xccff00, 3, 10);
      accentLight.position.set(3, -2, 2);
      scene.add(accentLight);

      // Central Neural Crystal (Octahedron)
      const brainGeo = new THREE.OctahedronGeometry(1.2, 0);
      const brainMat = new THREE.MeshPhysicalMaterial({
        color: 0x082f49,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        transmission: 0.5,
        reflectivity: 1.0,
      });
      const brain = new THREE.Mesh(brainGeo, brainMat);
      mainGroup.add(brain);
      animObjects.push({ mesh: brain, rotSpeedX: 0.007, rotSpeedY: 0.012 });

      // Inner Glowing AI Synapse Mesh
      const synGeo = new THREE.IcosahedronGeometry(0.7, 1);
      const synMat = new THREE.MeshBasicMaterial({
        color: 0xccff00,
        wireframe: true,
      });
      const synapse = new THREE.Mesh(synGeo, synMat);
      mainGroup.add(synapse);
      animObjects.push({ mesh: synapse, rotSpeedX: -0.015, rotSpeedY: -0.01 });

      // Orbiting Neural Gyro Ring
      const ringGeo = new THREE.TorusGeometry(1.7, 0.02, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.8,
        metalness: 0.9,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      mainGroup.add(ring);
      animObjects.push({ mesh: ring, rotSpeedX: 0.005, rotSpeedY: 0.01 });

      // Orbiting Career Data Nodes
      for (let i = 0; i < 4; i++) {
        const nodeGeo = new THREE.DodecahedronGeometry(0.18);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xccff00 : 0x06b6d4,
          emissive: i % 2 === 0 ? 0xccff00 : 0x06b6d4,
          emissiveIntensity: 0.9,
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        const angle = (i / 4) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.2, Math.sin(angle * 2) * 0.5);
        mainGroup.add(node);
        animObjects.push({ mesh: node, rotSpeedX: 0.02, rotSpeedY: 0.02 });
      }
    } else if (type === 'mobile') {
      // 2. MS MOBILES: 3D Titanium Smartphone Device Frame + OLED Display + Camera Lenses
      rimLight = new THREE.PointLight(0x38bdf8, 4, 10);
      rimLight.position.set(3, 3, 2);
      scene.add(rimLight);

      accentLight = new THREE.PointLight(0x6366f1, 3, 10);
      accentLight.position.set(-3, -2, 2);
      scene.add(accentLight);

      // Phone Body (Titanium chassis)
      const phoneGeo = new THREE.BoxGeometry(1.3, 2.4, 0.12);
      const phoneMat = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a,
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 1.0,
      });
      const phone = new THREE.Mesh(phoneGeo, phoneMat);
      mainGroup.add(phone);
      animObjects.push({ mesh: phone, rotSpeedX: 0.004, rotSpeedY: 0.008 });

      // Glowing OLED Screen Glass
      const screenGeo = new THREE.BoxGeometry(1.2, 2.26, 0.02);
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.2,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = 0.06;
      phone.add(screen);

      // Camera Module Bump
      const camBumpGeo = new THREE.BoxGeometry(0.5, 0.7, 0.06);
      const camBumpMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
      const camBump = new THREE.Mesh(camBumpGeo, camBumpMat);
      camBump.position.set(-0.3, 0.7, -0.07);
      phone.add(camBump);

      // Camera Lenses
      for (let c = 0; c < 3; c++) {
        const lensGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16);
        const lensMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(-0.3, 0.85 - c * 0.22, -0.11);
        phone.add(lens);
      }

      // Orbiting Commerce Halo Ring
      const haloGeo = new THREE.TorusGeometry(1.7, 0.02, 16, 64);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.7,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2.5;
      mainGroup.add(halo);
      animObjects.push({ mesh: halo, rotSpeedX: 0.006, rotSpeedY: -0.009 });
    } else if (type === 'cube') {
      // 1. INSTAGRAM AI AUTOMATION: 3D Glossy Beveled Cube + Emissive Glyphs + Orbiting Rings
      rimLight = new THREE.PointLight(0xa855f7, 4, 10);
      rimLight.position.set(-3, 2, 2);
      scene.add(rimLight);

      accentLight = new THREE.PointLight(0xccff00, 3, 10);
      accentLight.position.set(3, -2, 2);
      scene.add(accentLight);

      // Central Glossy 3D Chamfered Cube
      const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: 0x111116,
        metalness: 0.85,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
      });
      const cube = new THREE.Mesh(boxGeo, boxMat);
      mainGroup.add(cube);
      animObjects.push({ mesh: cube, rotSpeedX: 0.005, rotSpeedY: 0.008 });

      // Glowing Inner Core
      const coreGeo = new THREE.OctahedronGeometry(0.8);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xccff00,
        wireframe: true,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(core);
      animObjects.push({ mesh: core, rotSpeedX: -0.01, rotSpeedY: -0.015 });

      // 3D Orbital Gyroscope Rings
      const ringGeo1 = new THREE.TorusGeometry(1.5, 0.025, 16, 64);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 0.6,
        metalness: 0.9,
      });
      const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      mainGroup.add(ring1);
      animObjects.push({ mesh: ring1, rotSpeedX: 0.003, rotSpeedY: 0.01 });

      const ringGeo2 = new THREE.TorusGeometry(1.8, 0.02, 16, 64);
      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0xccff00,
        emissive: 0xccff00,
        emissiveIntensity: 0.5,
        metalness: 0.9,
      });
      const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 4;
      mainGroup.add(ring2);
      animObjects.push({ mesh: ring2, rotSpeedX: -0.006, rotSpeedY: -0.004 });
    } else if (type === 'orb') {
      // 2. LIVEMEET TRANSLATE: 3D Holographic Audio Sphere + Dynamic Soundwave Rings
      rimLight = new THREE.PointLight(0x38bdf8, 4, 10);
      rimLight.position.set(3, 3, 2);
      scene.add(rimLight);

      accentLight = new THREE.PointLight(0x10b981, 3, 10);
      accentLight.position.set(-3, -2, 2);
      scene.add(accentLight);

      // Glassy Holographic Sphere
      const sphereGeo = new THREE.SphereGeometry(1.1, 48, 48);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: 0x051025,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 1.2,
        clearcoat: 1.0,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      mainGroup.add(sphere);

      // Inner Pulsing Wireframe Nucleus
      const nucleusGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const nucleusMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
      });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      mainGroup.add(nucleus);
      animObjects.push({ mesh: nucleus, rotSpeedX: 0.012, rotSpeedY: 0.018 });

      // Multi-layer Soundwave Rings
      for (let i = 0; i < 3; i++) {
        const soundRingGeo = new THREE.TorusGeometry(1.4 + i * 0.25, 0.02, 16, 64);
        const soundRingMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x38bdf8 : 0x10b981,
          emissive: i % 2 === 0 ? 0x38bdf8 : 0x10b981,
          emissiveIntensity: 0.8,
        });
        const soundRing = new THREE.Mesh(soundRingGeo, soundRingMat);
        soundRing.rotation.x = (Math.PI / 2) + i * 0.3;
        soundRing.rotation.y = i * 0.5;
        mainGroup.add(soundRing);
        animObjects.push({ mesh: soundRing, rotSpeedX: 0.005 * (i + 1), rotSpeedY: -0.007 * (i + 1) });
      }
    } else {
      // 3. APEX FINANCIAL ENGINE: 3D Isometric Cyber Vault Core + Orbiting Transaction Crystals
      rimLight = new THREE.PointLight(0xccff00, 4, 10);
      rimLight.position.set(3, 2, 3);
      scene.add(rimLight);

      accentLight = new THREE.PointLight(0x10b981, 3, 10);
      accentLight.position.set(-3, -2, 2);
      scene.add(accentLight);

      // Central Isometric Diamond / Octahedron Core
      const vaultGeo = new THREE.OctahedronGeometry(1.3, 0);
      const vaultMat = new THREE.MeshPhysicalMaterial({
        color: 0x15181e,
        metalness: 0.95,
        roughness: 0.1,
        clearcoat: 1.0,
        reflectivity: 1.0,
      });
      const vault = new THREE.Mesh(vaultGeo, vaultMat);
      mainGroup.add(vault);
      animObjects.push({ mesh: vault, rotSpeedX: 0.008, rotSpeedY: 0.012 });

      // Inner Wireframe Prism
      const innerGeo = new THREE.IcosahedronGeometry(0.8, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xccff00,
        wireframe: true,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      mainGroup.add(inner);
      animObjects.push({ mesh: inner, rotSpeedX: -0.01, rotSpeedY: -0.008 });

      // Orbiting Golden / Emerald Data Shards
      for (let j = 0; j < 5; j++) {
        const shardGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const shardMat = new THREE.MeshStandardMaterial({
          color: 0xccff00,
          emissive: 0xccff00,
          emissiveIntensity: 0.7,
        });
        const shard = new THREE.Mesh(shardGeo, shardMat);
        const angle = (j / 5) * Math.PI * 2;
        shard.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 1.2, Math.sin(angle * 2) * 0.6);
        mainGroup.add(shard);
        animObjects.push({ mesh: shard, rotSpeedX: 0.02, rotSpeedY: 0.02 });
      }
    }

    // 3D Mouse Parallax & Tilt Tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = y * 0.8;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width - 0.5;
        const y = (touch.clientY - rect.top) / rect.height - 0.5;
        targetRotY = x * 1.2;
        targetRotX = y * 1.2;
      }
    };

    const handleTouchEnd = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera / group tilt interpolation
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.08;

      // Gentle floating hover motion
      mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Rotate individual components
      for (const obj of animObjects) {
        if (obj.rotSpeedX) obj.mesh.rotation.x += obj.rotSpeedX;
        if (obj.rotSpeedY) obj.mesh.rotation.y += obj.rotSpeedY;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div
      ref={mountRef}
      style={{ touchAction: 'pan-y' }}
      className={`relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
