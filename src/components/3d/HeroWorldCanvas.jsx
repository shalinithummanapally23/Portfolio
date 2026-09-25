import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroWorldCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.025);

    // Camera
    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 9);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // 1. Reflective Floor Plane
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x050816,
      transparent: true,
      opacity: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.2;
    scene.add(floor);

    // Floor Grid lines
    const gridHelper = new THREE.GridHelper(50, 40, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -2.18;
    scene.add(gridHelper);

    // 2. Volumetric Light Rays (Light Cones)
    const coneGeo = new THREE.ConeGeometry(3, 14, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lightRay1 = new THREE.Mesh(coneGeo, coneMat);
    lightRay1.position.set(-4, 6, -3);
    lightRay1.rotation.z = -Math.PI / 6;
    scene.add(lightRay1);

    const lightRay2 = new THREE.Mesh(coneGeo, coneMat.clone());
    lightRay2.material.color.setHex(0xa855f7);
    lightRay2.material.opacity = 0.035;
    lightRay2.position.set(5, 6, -4);
    lightRay2.rotation.z = Math.PI / 7;
    scene.add(lightRay2);

    // 3. Floating Dust Motes (1,200 particles)
    const dustCount = 1200;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 35;
      dustPositions[i * 3 + 1] = Math.random() * 14 - 2;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // 4. Floating Holographic Developer Avatar (Cybernetic Head & Torso with Breathing and Gyro Ring)
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(2.8, 0.4, 0); // Positioned to the right of the text
    scene.add(avatarGroup);

    // Avatar Head: Stylized Geometric Low-Poly Mesh
    const headGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const headMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 1.1;
    avatarGroup.add(headMesh);

    // Inner glowing core of the head (brain node)
    const brainGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const brainMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const brainMesh = new THREE.Mesh(brainGeo, brainMat);
    headMesh.add(brainMesh);

    // Torso / Chest Armor
    const torsoGeo = new THREE.CylinderGeometry(0.5, 0.35, 1.1, 6, 1, true);
    const torsoMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.y = 0;
    avatarGroup.add(torsoMesh);

    // Chest Core (Reactor)
    const reactorGeo = new THREE.OctahedronGeometry(0.25, 0);
    const reactorMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const reactor = new THREE.Mesh(reactorGeo, reactorMat);
    reactor.position.set(0, 0.1, 0.4);
    avatarGroup.add(reactor);

    // Rotating Holographic Ring around Avatar
    const holoRingGeo = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const holoRingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
    });
    const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
    holoRing.rotation.x = Math.PI / 3;
    avatarGroup.add(holoRing);

    const holoRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.01, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
    );
    holoRing2.rotation.x = -Math.PI / 4;
    avatarGroup.add(holoRing2);

    // Soft Shadow Disc below Avatar
    const shadowGeo = new THREE.CircleGeometry(0.9, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.6,
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.set(2.8, -2.15, 0);
    scene.add(shadowDisc);

    // Mouse Parallax & Camera Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 1.2;

    const onMouseMove = (e) => {
      const normalX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normalX;
      mouseY = normalY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || window.innerWidth;
      const h = currentMount.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Camera slow dolly movement + mouse smooth inertia
      targetCameraX = mouseX * 0.8;
      targetCameraY = 1.2 + mouseY * 0.4;
      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.5, 0);

      // Dust motes drift
      dustPoints.rotation.y = t * 0.02;
      dustPoints.rotation.x = Math.sin(t * 0.1) * 0.01;

      // Volumetric light rays gentle sway
      lightRay1.rotation.y = Math.sin(t * 0.5) * 0.1;
      lightRay2.rotation.y = Math.cos(t * 0.4) * 0.1;

      // Avatar Idle Breathing
      const breath = 1 + Math.sin(t * 2.2) * 0.04;
      torsoMesh.scale.set(breath, breath, breath);
      headMesh.position.y = 1.1 + Math.sin(t * 2.2) * 0.02;

      // Avatar Rotation & Mouse Reaction
      avatarGroup.rotation.y = mouseX * 0.4 + Math.sin(t * 0.5) * 0.1;
      avatarGroup.rotation.x = -mouseY * 0.2;

      reactor.rotation.z = t * 1.5;
      reactor.rotation.x = t * 1.2;

      // Holographic Ring Orbiting
      holoRing.rotation.z = t * 0.8;
      holoRing2.rotation.z = -t * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      gridHelper.dispose();
      coneGeo.dispose();
      coneMat.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      headGeo.dispose();
      headMat.dispose();
      brainGeo.dispose();
      brainMat.dispose();
      torsoGeo.dispose();
      torsoMat.dispose();
      reactorGeo.dispose();
      reactorMat.dispose();
      holoRingGeo.dispose();
      holoRingMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
