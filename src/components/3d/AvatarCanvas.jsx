import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AvatarCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for all avatar elements
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // 1. Central Holographic Core (Icosahedron with wireframe and glowing vertex points)
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 2);
    
    // Wireframe Mesh
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWireframe = new THREE.Mesh(coreGeometry, wireframeMaterial);
    avatarGroup.add(coreWireframe);

    // Inner glowing core
    const innerGeometry = new THREE.IcosahedronGeometry(0.85, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    avatarGroup.add(innerCore);

    // Central pulsing orb
    const centerOrbGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const centerOrbMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const centerOrb = new THREE.Mesh(centerOrbGeo, centerOrbMat);
    avatarGroup.add(centerOrb);

    // 2. Gimbal Orbit Rings (Holographic Gyroscope)
    const createRing = (radius, tube, color, rotX, rotY) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(2.1, 0.015, 0x38bdf8, Math.PI / 4, 0);
    const ring2 = createRing(2.35, 0.015, 0xa855f7, -Math.PI / 3, Math.PI / 6);
    const ring3 = createRing(2.6, 0.012, 0x6366f1, Math.PI / 6, Math.PI / 3);
    avatarGroup.add(ring1);
    avatarGroup.add(ring2);
    avatarGroup.add(ring3);

    // 3. Floating Data Nodes / Particles around avatar
    const particlesCount = 200;
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const cyan = new THREE.Color(0x38bdf8);
    const purple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.8 + Math.random() * 1.5;

      particlePositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = dist * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? cyan : purple;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    avatarGroup.add(particles);

    // Mouse Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      mouseX = (x / (rect.width / 2)) * 0.6;
      mouseY = (y / (rect.height / 2)) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow rotation
      coreWireframe.rotation.y = elapsedTime * 0.25;
      coreWireframe.rotation.x = elapsedTime * 0.15;

      innerCore.rotation.y = -elapsedTime * 0.35;
      innerCore.rotation.z = elapsedTime * 0.2;

      // Pulsing center orb scale
      const pulseScale = 1 + Math.sin(elapsedTime * 3) * 0.15;
      centerOrb.scale.set(pulseScale, pulseScale, pulseScale);

      // Rings rotating at offset angles
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.x = -elapsedTime * 0.25;
      ring3.rotation.y = elapsedTime * 0.2;

      // Particles gentle drift
      particles.rotation.y = elapsedTime * 0.08;

      // Mouse Parallax lerp
      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;

      avatarGroup.rotation.x = targetRotationX;
      avatarGroup.rotation.y = targetRotationY;
      avatarGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12; // Gentle floating bob

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      wireframeMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      centerOrbGeo.dispose();
      centerOrbMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[400px] md:h-[520px] cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
    >
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
    </div>
  );
}
