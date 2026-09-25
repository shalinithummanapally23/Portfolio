import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleFieldCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    // Particle Field (800 particles)
    const particleCount = 750;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const cyan = new THREE.Color('#38bdf8');
    const indigo = new THREE.Color('#818cf8');
    const violet = new THREE.Color('#c084fc');
    const white = new THREE.Color('#ffffff');
    const palette = [cyan, indigo, violet, white];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add floating geometric shapes in background
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const octaGeo = new THREE.OctahedronGeometry(2.5, 0);
    const tetraGeo = new THREE.TetrahedronGeometry(2.8, 0);
    const shapeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const shape1 = new THREE.Mesh(octaGeo, shapeMat);
    shape1.position.set(-35, 18, -20);
    shapesGroup.add(shape1);

    const shape2 = new THREE.Mesh(tetraGeo, shapeMat.clone());
    shape2.material.color.setHex(0xa855f7);
    shape2.position.set(38, -22, -15);
    shapesGroup.add(shape2);

    const shape3 = new THREE.Mesh(octaGeo, shapeMat.clone());
    shape3.material.color.setHex(0x6366f1);
    shape3.position.set(-30, -30, -10);
    shapesGroup.add(shape3);

    // Mouse responsiveness
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation of galaxy
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Rotate geometric background accents
      shape1.rotation.x = elapsedTime * 0.3;
      shape1.rotation.y = elapsedTime * 0.2;
      shape2.rotation.y = -elapsedTime * 0.25;
      shape2.rotation.z = elapsedTime * 0.15;
      shape3.rotation.x = elapsedTime * 0.2;
      shape3.rotation.z = -elapsedTime * 0.18;

      // Mouse smooth lerp
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      octaGeo.dispose();
      tetraGeo.dispose();
      shapeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
