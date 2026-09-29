// src/js/three/heroMesh.js
// 3D Neural Network Particle Mesh for Hero Background

import * as THREE from 'three';

export function initHeroNeuralNetwork(canvas) {
  if (!canvas) return;

  const header = canvas.closest('header') || document.body;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Particles
  const particleCount = 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 380;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 380;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 180;

    velocities.push({
      x: (Math.random() - 0.5) * 0.35,
      y: (Math.random() - 0.5) * 0.35,
      z: (Math.random() - 0.5) * 0.35
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x10b981,
    size: 1.6,
    transparent: true,
    opacity: 0.85
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Connecting lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff87,
    transparent: true,
    opacity: 0.18
  });

  const maxDistance = 42;
  const maxLines = 1500;
  const linePositions = new Float32Array(maxLines * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
  scene.add(linesMesh);

  // Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.12;
    mouseY = (event.clientY - windowHalfY) * 0.12;
  }, { passive: true });

  window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  // IntersectionObserver: Pause when hero is not visible
  let isVisible = true;
  let animationId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) {
        animate();
      }
    });
  }, { threshold: 0.05 });

  observer.observe(header);

  let frameCount = 0;

  function animate() {
    if (!isVisible) {
      animationId = null;
      return;
    }
    animationId = requestAnimationFrame(animate);

    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (-targetY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    const posAttr = particles.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;

      if (posArray[i * 3] > 190 || posArray[i * 3] < -190) velocities[i].x *= -1;
      if (posArray[i * 3 + 1] > 190 || posArray[i * 3 + 1] < -190) velocities[i].y *= -1;
      if (posArray[i * 3 + 2] > 90 || posArray[i * 3 + 2] < -90) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    // Recalculate lines every 2nd frame to save CPU
    frameCount++;
    if (frameCount % 2 === 0) {
      let lineCount = 0;
      const linePosArray = linesMesh.geometry.attributes.position.array;
      const distSqLimit = maxDistance * maxDistance;

      for (let i = 0; i < particleCount && lineCount < maxLines; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount && lineCount < maxLines; j++) {
          const dx = x1 - posArray[j * 3];
          const dy = y1 - posArray[j * 3 + 1];
          const dz = z1 - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < distSqLimit) {
            const idx = lineCount * 6;
            linePosArray[idx] = x1;
            linePosArray[idx + 1] = y1;
            linePosArray[idx + 2] = z1;
            linePosArray[idx + 3] = posArray[j * 3];
            linePosArray[idx + 4] = posArray[j * 3 + 1];
            linePosArray[idx + 5] = posArray[j * 3 + 2];
            lineCount++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, lineCount * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animate();
}
