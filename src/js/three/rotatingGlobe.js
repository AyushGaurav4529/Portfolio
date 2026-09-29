// src/js/three/rotatingGlobe.js
// 3D Fibonacci Rotating Particle Sphere with Wireframe Overlay & Orbit Ring

import * as THREE from 'three';

export function init3DGlobe(canvas) {
  if (!canvas) return;
  const wrap = document.getElementById('globe-canvas-wrap');
  if (!wrap) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const SIZE = wrap.offsetWidth || 420;
  renderer.setSize(SIZE, SIZE, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 2.8;

  function resizeGlobe() {
    const s = wrap.offsetWidth;
    if (s > 0) renderer.setSize(s, s, false);
  }
  window.addEventListener('resize', resizeGlobe, { passive: true });

  // Fibonacci sphere particles
  const PARTICLE_COUNT = 1400;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const c1 = new THREE.Color(0x10b981);
  const c2 = new THREE.Color(0x00ff87);
  const c3 = new THREE.Color(0x6366f1);
  const palette = [c1, c2, c3];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 1.0 + (Math.random() - 0.5) * 0.03;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    const col = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.016,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Wireframe sphere overlay
  const sphereGeo = new THREE.SphereGeometry(1.0, 16, 10);
  const sphereEdges = new THREE.EdgesGeometry(sphereGeo);
  const sphereMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.12 });
  const sphereWire = new THREE.LineSegments(sphereEdges, sphereMat);
  scene.add(sphereWire);

  // Orbit ring
  const ringGeo = new THREE.RingGeometry(1.08, 1.12, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff87, side: THREE.DoubleSide, transparent: true, opacity: 0.16 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.5;
  scene.add(ring);

  // Mouse tilt
  let gmx = 0, gmy = 0;
  const header = document.querySelector('header');
  if (header) {
    header.addEventListener('mousemove', (e) => {
      const rect = header.getBoundingClientRect();
      gmx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.8;
      gmy = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    }, { passive: true });
    header.addEventListener('mouseleave', () => { gmx = 0; gmy = 0; });
  }

  setTimeout(() => wrap.classList.add('globe-visible'), 800);

  let isVisible = true;
  let globeFrame = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !globeFrame) {
        animateGlobe(0);
      }
    });
  }, { threshold: 0.05 });

  if (header) observer.observe(header);

  function animateGlobe(t) {
    if (!isVisible) {
      globeFrame = null;
      return;
    }
    globeFrame = requestAnimationFrame(animateGlobe);

    particles.rotation.y = t * 0.0003;
    particles.rotation.x += (gmy * 0.4 - particles.rotation.x) * 0.04;
    particles.rotation.z += (-gmx * 0.3 - particles.rotation.z) * 0.04;
    sphereWire.rotation.y = t * 0.0002;
    ring.rotation.z = t * 0.0004;

    renderer.render(scene, camera);
  }

  animateGlobe(0);
}
