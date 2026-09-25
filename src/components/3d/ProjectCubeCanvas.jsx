import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProjectCubeCanvas({
  projects,
  onSelectProject,
  isFlyingThrough,
}) {
  const mountRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Cube Groups (3 Projects)
    const cubeGroups = [];
    const cubeConfigs = [
      { x: -2.8, color: 0x38bdf8, label: 'AI BOT' },
      { x: 0, color: 0x818cf8, label: 'BANKING' },
      { x: 2.8, color: 0xa855f7, label: 'DROWSINESS' },
    ];

    cubeConfigs.forEach((cfg, idx) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(cfg.x, 0, 0);
      scene.add(cGroup);

      // Outer Glass Cube
      const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      const boxMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      cGroup.add(boxMesh);

      // Inner Glowing Core Cube
      const innerGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      cGroup.add(innerMesh);

      // Center Octahedron Node
      const nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
      const nodeMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      cGroup.add(nodeMesh);

      // Ambient Floating Rings around Cube
      const ringGeo = new THREE.TorusGeometry(1.2, 0.012, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      cGroup.add(ring);

      cubeGroups.push({
        group: cGroup,
        box: boxMesh,
        inner: innerMesh,
        node: nodeMesh,
        ring: ring,
        targetRotY: 0,
        isHovered: false,
        project: projects[idx],
      });
    });

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);

    const onPointerMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = cubeGroups.map((c) => c.box);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = cubeGroups.find((c) => c.box === hit);
        if (matched && onSelectProject) {
          onSelectProject(matched.project);
        }
      }
    };

    currentMount.addEventListener('mousemove', onPointerMove, { passive: true });
    currentMount.addEventListener('click', onClick);

    const onResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || window.innerWidth;
      const h = currentMount.clientHeight || 500;
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

      // Check Hover
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = cubeGroups.map((c) => c.box);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      const hoveredBox = intersects.length > 0 ? intersects[0].object : null;

      cubeGroups.forEach((c, idx) => {
        const isHov = hoveredBox === c.box;
        c.isHovered = isHov;

        // Idle Floating bob
        c.group.position.y = Math.sin(t * 1.5 + idx) * 0.12;

        if (isHov) {
          // Slow continuous 3D flip on hover
          c.group.rotation.y += 0.04;
          c.group.rotation.x += 0.02;
          c.inner.rotation.y -= 0.06;
          c.box.material.opacity = 0.9;
        } else {
          // Gentle idle spin
          c.group.rotation.y += 0.01;
          c.group.rotation.x = Math.sin(t + idx) * 0.1;
          c.box.material.opacity = 0.5;
        }

        c.node.rotation.z = t * 1.2;
        c.ring.rotation.z = -t * 0.8;
      });

      // Fly-Through Camera Push Transition
      if (isFlyingThrough) {
        camera.position.z += (1.5 - camera.position.z) * 0.08;
      } else {
        camera.position.z += (7.5 - camera.position.z) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      currentMount.removeEventListener('mousemove', onPointerMove);
      currentMount.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [projects, onSelectProject, isFlyingThrough]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[450px] sm:h-[500px] cursor-pointer select-none"
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-cyan-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/20">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D ROTATING PROJECT CUBES // HOVER TO FLIP, CLICK TO FLY-THROUGH</span>
      </div>
    </div>
  );
}
