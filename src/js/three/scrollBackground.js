// src/js/three/scrollBackground.js
// Scroll-Linked 3D Abstract Geometry Background on #scroll-3d-bg

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initScroll3DScene(canvas) {
  if (!canvas) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x00ff87, 1.8);
  dirLight1.position.set(50, 50, 50);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.2);
  dirLight2.position.set(-50, -50, -50);
  scene.add(dirLight2);

  const geometry = new THREE.TorusKnotGeometry(28, 7, 100, 16);

  const material = new THREE.MeshBasicMaterial({
    color: 0x0f172a,
    wireframe: false
  });

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });

  const mesh = new THREE.Mesh(geometry, material);
  const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  wireframe.scale.set(1.02, 1.02, 1.02);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(wireframe);
  scene.add(group);

  group.position.set(30, 0, -50);
  group.rotation.set(0.5, 0.5, 0);

  // GSAP ScrollTrigger
  try {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(group.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 4,
      z: Math.PI,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    gsap.to(group.position, {
      x: -30,
      y: 20,
      z: -20,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    });
  } catch (e) {}

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  let isPageVisible = !document.hidden;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isPageVisible) return;

    group.rotation.y += 0.0008;
    group.rotation.x += 0.0004;

    renderer.render(scene, camera);
  }

  animate();
}
