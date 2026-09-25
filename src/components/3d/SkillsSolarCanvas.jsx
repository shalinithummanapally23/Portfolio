import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const planetsData = [
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    color: 0x10b981, // Emerald
    size: 0.55,
    distance: 3.2,
    speed: 0.35,
    hasRing: true,
    ringColor: 0x34d399,
    description: 'Enterprise Microservices, Spring Cloud, Dependency Injection & REST',
    proficiency: '95%',
  },
  {
    id: 'react',
    name: 'React 19',
    color: 0x38bdf8, // Cyan
    size: 0.5,
    distance: 4.6,
    speed: 0.28,
    hasRing: true,
    ringColor: 0x0284c7,
    description: 'Modern Component Architectures, State Machines, Three.js & Framer Motion',
    proficiency: '92%',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    color: 0x0284c7, // Ocean Blue
    size: 0.45,
    distance: 6.0,
    speed: 0.22,
    hasRing: false,
    description: 'Normalized Relational Modeling, Index Tuning & ACID Transactions',
    proficiency: '90%',
  },
  {
    id: 'hibernate',
    name: 'Hibernate JPA',
    color: 0x14b8a6, // Teal
    size: 0.4,
    distance: 7.2,
    speed: 0.18,
    hasRing: false,
    description: 'High-Performance ORM, Second-Level Caching & Query Optimization',
    proficiency: '88%',
  },
  {
    id: 'jwt',
    name: 'JWT & Security',
    color: 0xf43f5e, // Rose/Ruby
    size: 0.42,
    distance: 8.4,
    speed: 0.15,
    hasRing: true,
    ringColor: 0xfb7185,
    description: 'Cryptographic Stateless Tokens, RBAC Authorization & OWASP Defense',
    proficiency: '90%',
  },
  {
    id: 'docker',
    name: 'Docker',
    color: 0x3b82f6, // Navy Blue
    size: 0.38,
    distance: 9.6,
    speed: 0.12,
    hasRing: false,
    description: 'Multi-Stage Container Builds, Docker Compose & Microservice Orchestration',
    proficiency: '82%',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    color: 0xa855f7, // Purple
    size: 0.38,
    distance: 10.8,
    speed: 0.1,
    hasRing: false,
    description: 'CI/CD Pipelines, Distributed Version Control & Collaborative GitFlow',
    proficiency: '92%',
  },
];

export default function SkillsSolarCanvas({ onSelectPlanet, activePlanetId }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();

    const width = currentMount.clientWidth || window.innerWidth;
    const height = currentMount.clientHeight || 550;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Center: Java Celestial Sun
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    // Sun Core
    const sunGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Amber Sun
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Sun Corona / Plasma halo
    const coronaGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // Ambient Starfield Particles
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 2. Planets & Orbital Paths
    const planetMeshes = [];

    planetsData.forEach((planet) => {
      // Draw Orbital Ring
      const orbitCurve = new THREE.EllipseCurve(0, 0, planet.distance, planet.distance, 0, 2 * Math.PI, false, 0);
      const points = orbitCurve.getPoints(128);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, 0, p.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Planet Mesh Group
      const pGroup = new THREE.Group();
      scene.add(pGroup);

      const pGeo = new THREE.SphereGeometry(planet.size, 24, 24);
      const pMat = new THREE.MeshBasicMaterial({
        color: planet.color,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pGroup.add(pMesh);

      // Optional Planetary Ring
      if (planet.hasRing) {
        const ringGeo = new THREE.RingGeometry(planet.size * 1.4, planet.size * 2.0, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: planet.ringColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.5;
        pGroup.add(ringMesh);
      }

      planetMeshes.push({
        data: planet,
        group: pGroup,
        mesh: pMesh,
        angle: Math.random() * Math.PI * 2,
      });
    });

    // 3. Glowing Connection Line (Java to Spring Boot, Spring Boot to MySQL, etc.)
    const connectionMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const connectionGeo = new THREE.BufferGeometry();
    const connectionPositions = new Float32Array(6 * 3); // 2 connections
    connectionGeo.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    const connectionLines = new THREE.LineSegments(connectionGeo, connectionMat);
    scene.add(connectionLines);

    // Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);
    let targetCameraY = 14;
    let targetCameraZ = 18;

    const onPointerMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = planetMeshes.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const matched = planetMeshes.find((p) => p.mesh === hitMesh);
        if (matched && onSelectPlanet) {
          onSelectPlanet(matched.data);
        }
      }
    };

    currentMount.addEventListener('mousemove', onPointerMove, { passive: true });
    currentMount.addEventListener('click', onClick);

    const onResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth || window.innerWidth;
      const h = currentMount.clientHeight || 550;
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

      // Sun Pulsing
      const sunPulse = 1 + Math.sin(t * 2) * 0.04;
      coronaMesh.scale.set(sunPulse, sunPulse, sunPulse);
      coronaMesh.rotation.y = t * 0.3;
      coronaMesh.rotation.z = t * 0.2;
      sunMesh.rotation.y = t * 0.1;

      // Update Planet Orbits
      planetMeshes.forEach((p) => {
        p.angle += p.data.speed * 0.015;
        const x = Math.cos(p.angle) * p.data.distance;
        const z = Math.sin(p.angle) * p.data.distance;
        p.group.position.set(x, 0, z);
        p.mesh.rotation.y += 0.03;
      });

      // Update Connection Lines (Connecting Sun -> Spring Boot, Spring Boot -> React)
      if (planetMeshes.length >= 2) {
        const p1 = planetMeshes[0].group.position; // Spring Boot
        const p2 = planetMeshes[1].group.position; // React
        const p3 = planetMeshes[2].group.position; // MySQL

        const pos = connectionGeo.attributes.position.array;
        // Sun to Spring Boot
        pos[0] = 0; pos[1] = 0; pos[2] = 0;
        pos[3] = p1.x; pos[4] = p1.y; pos[5] = p1.z;
        // Spring Boot to React
        pos[6] = p1.x; pos[7] = p1.y; pos[8] = p1.z;
        pos[9] = p2.x; pos[10] = p2.y; pos[11] = p2.z;
        // Spring Boot to MySQL
        pos[12] = p1.x; pos[13] = p1.y; pos[14] = p1.z;
        pos[15] = p3.x; pos[16] = p3.y; pos[17] = p3.z;

        connectionGeo.attributes.position.needsUpdate = true;
      }

      // Check Hover
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = planetMeshes.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        currentMount.style.cursor = 'pointer';
        targetCameraZ = 15;
      } else {
        currentMount.style.cursor = 'default';
        targetCameraZ = 18;
      }

      // Camera Smooth Inertia
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

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
      sunGeo.dispose();
      sunMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      connectionGeo.dispose();
      connectionMat.dispose();
    };
  }, [onSelectPlanet]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[520px] md:h-[600px] select-none"
    >
      {/* HUD Guide Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-cyan-300 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/20">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D SOLAR SYSTEM // HOVER OR CLICK PLANETS</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[10px] font-mono text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
        <span>CORE: JAVA 17+ ENTERPRISE SUN</span>
      </div>
    </div>
  );
}
