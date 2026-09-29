// src/js/three/heroGeometry.js
// Floating 3D Wireframe Geometries on #hero-3d-bg

import * as THREE from 'three';

export function init3DHeroBg(canvas) {
  if (!canvas) return;
  const header = canvas.closest('header');
  if (!header) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 5;

  function resizeHeroBg() {
    const w = header.offsetWidth;
    const h = header.offsetHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resizeHeroBg();
  window.addEventListener('resize', resizeHeroBg, { passive: true });

  const neonGreen = 0x10b981;
  const neonBright = 0x00ff87;
  const purple = 0x6366f1;
  const sky = 0x38bdf8;

  const wireMat = (color) => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.5 });
  const edgeMat = (color) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65 });

  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(0.6, 0),
    new THREE.OctahedronGeometry(0.55, 0),
    new THREE.TetrahedronGeometry(0.5, 0),
    new THREE.IcosahedronGeometry(0.4, 0),
    new THREE.OctahedronGeometry(0.7, 0),
    new THREE.IcosahedronGeometry(0.35, 0),
    new THREE.TetrahedronGeometry(0.45, 0),
    new THREE.OctahedronGeometry(0.5, 0),
    new THREE.IcosahedronGeometry(0.5, 0),
  ];
  const colors = [neonGreen, neonBright, purple, sky, neonGreen, neonBright, purple, sky, neonGreen];

  geometries.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, wireMat(colors[i]));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat(colors[i]));
    const group = new THREE.Group();
    group.add(mesh);
    group.add(edges);

    const angle = (i / geometries.length) * Math.PI * 2;
    const radius = 1.8 + Math.random() * 2.2;
    group.position.set(
      Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5,
      Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 2
    );
    group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    group.userData = {
      rotX: (Math.random() - 0.5) * 0.006,
      rotY: (Math.random() - 0.5) * 0.006,
      rotZ: (Math.random() - 0.5) * 0.003,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: group.position.y
    };
    scene.add(group);
    shapes.push(group);
  });

  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.3;
    my = (e.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });

  let isVisible = true;
  let heroFrame = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !heroFrame) {
        animateHeroBg(0);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(header);

  function animateHeroBg(t) {
    if (!isVisible) {
      heroFrame = null;
      return;
    }
    heroFrame = requestAnimationFrame(animateHeroBg);

    camera.position.x += (mx - camera.position.x) * 0.04;
    camera.position.y += (-my - camera.position.y) * 0.04;

    shapes.forEach((g) => {
      g.rotation.x += g.userData.rotX;
      g.rotation.y += g.userData.rotY;
      g.rotation.z += g.userData.rotZ;
      g.position.y = g.userData.baseY + Math.sin(t * 0.0008 + g.userData.floatOffset) * 0.22;
    });

    renderer.render(scene, camera);
  }

  animateHeroBg(0);
}
