// src/js/three/skillsShapes.js
// Floating 3D Wireframe Polyhedra for Skills Section

import * as THREE from 'three';

export function initSkillsFloatingIcons(canvas) {
  if (!canvas) return;
  const container = document.getElementById('skills');
  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 200;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x00ff87, 1.8, 400);
  pointLight.position.set(50, 50, 100);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x10b981, 1.8, 400);
  pointLight2.position.set(-50, -50, 100);
  scene.add(pointLight2);

  const shapes = [];
  const geometries = [
    new THREE.IcosahedronGeometry(12, 0),
    new THREE.OctahedronGeometry(14, 0),
    new THREE.TetrahedronGeometry(15, 0),
    new THREE.TorusGeometry(10, 4, 12, 60),
    new THREE.DodecahedronGeometry(12, 0)
  ];

  const material = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.6,
    wireframe: true
  });

  for (let i = 0; i < 16; i++) {
    const geom = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geom, material);

    mesh.position.x = (Math.random() - 0.5) * 380;
    mesh.position.y = (Math.random() - 0.5) * 380;
    mesh.position.z = (Math.random() - 0.5) * 180 - 40;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.015,
      floatSpeed: 0.0008 + Math.random() * 0.0015,
      floatPhase: Math.random() * Math.PI * 2,
      baseY: mesh.position.y
    };

    scene.add(mesh);
    shapes.push(mesh);
  }

  let mouseX = 0;
  let mouseY = 0;

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
        animate(0);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);

  function animate(time) {
    if (!isVisible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    shapes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotSpeedX;
      mesh.rotation.y += mesh.userData.rotSpeedY;
      mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatPhase) * 18;
    });

    renderer.render(scene, camera);
  }

  animate(0);
}
