// src/js/three/connectGlobe.js
// 3D Wireframe Earth Globe with Beacon Points on #connect-canvas

import * as THREE from 'three';

export function initConnectGlobe(canvas) {
  if (!canvas) return;
  const container = document.getElementById('connect');
  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 240;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);

  const globeGeometry = new THREE.SphereGeometry(75, 20, 20);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });

  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  globe.rotation.z = 0.35;
  scene.add(globe);

  // Beacon points
  const pointCount = 40;
  const pointPositions = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / pointCount);
    const theta = Math.sqrt(pointCount * Math.PI) * phi;
    const r = 75;

    pointPositions[i * 3]     = r * Math.cos(theta) * Math.sin(phi);
    pointPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
    pointPositions[i * 3 + 2] = r * Math.cos(phi);
  }

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));

  const pointMat = new THREE.PointsMaterial({
    color: 0x00ff87,
    size: 2.8,
    transparent: true,
    opacity: 0.85
  });

  const points = new THREE.Points(pointGeo, pointMat);
  globe.add(points);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }, { passive: true });

  let isVisible = true;
  let animId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animate();
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);

  function animate() {
    if (!isVisible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    globe.rotation.y += 0.0018;
    globe.rotation.x += (mouseY * 0.15 - globe.rotation.x) * 0.04;

    renderer.render(scene, camera);
  }

  animate();
}
