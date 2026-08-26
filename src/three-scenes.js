// src/three-scenes.js

document.addEventListener("DOMContentLoaded", () => {
    // Only run if THREE is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded.');
        return;
    }

    // Phase 1: Hero Neural Network Mesh
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        initHeroNeuralNetwork(canvas);
    }

    // Phase 2: Skills Floating 3D Icons
    const skillsCanvas = document.getElementById('skills-canvas');
    if (skillsCanvas) {
        initSkillsFloatingIcons(skillsCanvas);
    }

    // Phase 3: Connect Wireframe Globe
    const connectCanvas = document.getElementById('connect-canvas');
    if (connectCanvas) {
        initConnectGlobe(connectCanvas);
    }

    // Phase 4: Scroll-Linked 3D Background
    const scrollCanvas = document.getElementById('scroll-3d-bg');
    if (scrollCanvas) {
        initScroll3DScene(scrollCanvas);
    }

    // Phase 5: Projects WebGL Fluid Hover
    initProjectHoverEffects();
});

function initHeroNeuralNetwork(canvas) {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Ensure canvas stays fixed and covers screen if it's the background
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1'; // Behind everything
    canvas.style.pointerEvents = 'none';

    // Particles
    const particleCount = 250;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        velocities.push({
            x: (Math.random() - 0.5) * 0.4,
            y: (Math.random() - 0.5) * 0.4,
            z: (Math.random() - 0.5) * 0.4
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x10b981, // Tailwind emerald-500
        size: 1.5,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines connecting particles
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff87, // Neon bright
        transparent: true,
        opacity: 0.15
    });

    const maxDistance = 45;
    
    // Pre-allocate buffer for lines to improve performance
    // Max lines = N * (N - 1) / 2. We won't reach this, so allocate a safe amount.
    const maxLines = 4000;
    const linePositions = new Float32Array(maxLines * 6); // 2 vertices per line * 3 coords
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(linesMesh);

    // Mouse interaction for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.15;
        mouseY = (event.clientY - windowHalfY) * 0.15;
    });

    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        // Parallax effect on camera
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        const posAttr = particles.geometry.attributes.position;
        const posArray = posAttr.array;
        
        // Update particle positions
        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3] += velocities[i].x;
            posArray[i * 3 + 1] += velocities[i].y;
            posArray[i * 3 + 2] += velocities[i].z;

            // Bounce off boundaries loosely
            if (posArray[i * 3] > 200 || posArray[i * 3] < -200) velocities[i].x *= -1;
            if (posArray[i * 3 + 1] > 200 || posArray[i * 3 + 1] < -200) velocities[i].y *= -1;
            if (posArray[i * 3 + 2] > 100 || posArray[i * 3 + 2] < -100) velocities[i].z *= -1;
        }
        posAttr.needsUpdate = true;

        // Re-calculate lines based on distance
        let lineCount = 0;
        const linePosArray = linesMesh.geometry.attributes.position.array;
        
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dx = posArray[i * 3] - posArray[j * 3];
                const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
                const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistance * maxDistance) {
                    if (lineCount < maxLines) {
                        linePosArray[lineCount * 6] = posArray[i * 3];
                        linePosArray[lineCount * 6 + 1] = posArray[i * 3 + 1];
                        linePosArray[lineCount * 6 + 2] = posArray[i * 3 + 2];
                        
                        linePosArray[lineCount * 6 + 3] = posArray[j * 3];
                        linePosArray[lineCount * 6 + 4] = posArray[j * 3 + 1];
                        linePosArray[lineCount * 6 + 5] = posArray[j * 3 + 2];
                        
                        lineCount++;
                    }
                }
            }
        }

        linesMesh.geometry.setDrawRange(0, lineCount * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();
}

function initSkillsFloatingIcons(canvas) {
    const scene = new THREE.Scene();

    const container = document.getElementById('skills');
    
    // We want the camera to cover the section size
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ff87, 2, 400);
    pointLight.position.set(50, 50, 100);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x10b981, 2, 400);
    pointLight2.position.set(-50, -50, 100);
    scene.add(pointLight2);

    // Create 3D Shapes representing skills
    const shapes = [];
    const geometries = [
        new THREE.IcosahedronGeometry(12, 0),
        new THREE.OctahedronGeometry(14, 0),
        new THREE.TetrahedronGeometry(15, 0),
        new THREE.TorusGeometry(10, 4, 16, 100),
        new THREE.DodecahedronGeometry(12, 0)
    ];

    const material = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });

    for (let i = 0; i < 20; i++) {
        const geom = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geom, material);
        
        // Random position
        mesh.position.x = (Math.random() - 0.5) * 400;
        mesh.position.y = (Math.random() - 0.5) * 400;
        mesh.position.z = (Math.random() - 0.5) * 200 - 50;

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        // Rotation speed
        mesh.userData.rotSpeedX = (Math.random() - 0.5) * 0.02;
        mesh.userData.rotSpeedY = (Math.random() - 0.5) * 0.02;

        // Floating speed and phase
        mesh.userData.floatSpeed = 0.001 + Math.random() * 0.002;
        mesh.userData.floatPhase = Math.random() * Math.PI * 2;
        mesh.userData.baseY = mesh.position.y;

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Mouse interaction for rotation and subtle movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        // Normalize mouse coordinates to -1 to 1 based on window
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    function animate(time) {
        requestAnimationFrame(animate);

        shapes.forEach((mesh) => {
            // Self rotation
            mesh.rotation.x += mesh.userData.rotSpeedX;
            mesh.rotation.y += mesh.userData.rotSpeedY;

            // Float up and down
            mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatPhase) * 20;
            
            // Subtle response to mouse
            mesh.position.x += (mouseX * 10 - (mesh.position.x - mesh.userData.baseY)) * 0.001; // Fake inertia
        });

        renderer.render(scene, camera);
    }

    animate(0);
}

function initConnectGlobe(canvas) {
    const scene = new THREE.Scene();

    const container = document.getElementById('connect');
    
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Globe
    const globeGeometry = new THREE.SphereGeometry(80, 24, 24);
    
    // Wireframe material
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    
    // Tilt the globe slightly
    globe.rotation.z = 0.4;
    scene.add(globe);

    // Add some random "beacon" points on the globe
    const pointGeo = new THREE.BufferGeometry();
    const pointCount = 50;
    const pointPositions = new Float32Array(pointCount * 3);
    
    for (let i = 0; i < pointCount; i++) {
        // Random point on sphere
        const phi = Math.acos(-1 + (2 * i) / pointCount);
        const theta = Math.sqrt(pointCount * Math.PI) * phi;
        
        const r = 80;
        
        pointPositions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        pointPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pointPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    
    const pointMat = new THREE.PointsMaterial({
        color: 0x00ff87,
        size: 3,
        transparent: true,
        opacity: 0.8
    });
    
    const points = new THREE.Points(pointGeo, pointMat);
    globe.add(points); // Add to globe so they rotate together

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        // Slow automatic rotation
        globe.rotation.y += 0.002;
        
        // Slight interaction based on mouse
        globe.rotation.x += (mouseY * 0.2 - globe.rotation.x) * 0.05;
        // Keep the z tilt
        globe.rotation.z += (0.4 - globe.rotation.z) * 0.05;

        renderer.render(scene, camera);
    }

    animate();
}

function initScroll3DScene(canvas) {
    const scene = new THREE.Scene();
    
    // Add some atmospheric fog
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00ff87, 2);
    dirLight1.position.set(50, 50, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.5);
    dirLight2.position.set(-50, -50, -50);
    scene.add(dirLight2);

    // Create a complex abstract geometric shape
    const geometry = new THREE.TorusKnotGeometry(30, 8, 150, 20);
    
    // Create a wireframe version and a solid version
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x0f172a, // dark slate
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    });
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    const mesh = new THREE.Mesh(geometry, material);
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Scale up wireframe slightly to avoid z-fighting
    wireframe.scale.set(1.02, 1.02, 1.02);
    
    const group = new THREE.Group();
    group.add(mesh);
    group.add(wireframe);
    scene.add(group);

    // Position it initially
    group.position.set(30, 0, -50);
    group.rotation.set(0.5, 0.5, 0);

    // GSAP ScrollTrigger Integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate the rotation and position of the geometry based on scroll progress
        gsap.to(group.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 4,
            z: Math.PI,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1 // smooth scrubbing
            }
        });

        // Move the object side to side as user scrolls
        gsap.to(group.position, {
            x: -30,
            y: 20,
            z: -20,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);

        // Constant slow idle rotation
        group.rotation.y += 0.001;
        group.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();
}

function initProjectHoverEffects() {
    const cards = document.querySelectorAll('.project-card-trigger');
    if (cards.length === 0) return;

    cards.forEach(card => {
        // Create canvas inside card
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.style.zIndex = '1'; // Ensure content is above

        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0'; // Hidden by default
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.pointerEvents = 'none';
        
        // Add a dark overlay to make text readable
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.inset = '0';
        overlay.style.backgroundColor = 'rgba(17, 17, 17, 0.8)';
        overlay.style.zIndex = '-1';
        
        card.insertBefore(canvas, card.firstChild);
        card.insertBefore(overlay, card.firstChild);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, card.clientWidth / card.clientHeight, 0.1, 100);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(card.clientWidth, card.clientHeight);

        // Simple fluid-like distortion using points
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 10;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x10b981,
            size: 1.5,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let animationId;
        let time = 0;
        let isHovered = false;

        function animate() {
            if (!isHovered) return;
            animationId = requestAnimationFrame(animate);
            time += 0.05;
            
            const posAttr = particles.geometry.attributes.position;
            const posArray = posAttr.array;
            
            for (let i = 0; i < particleCount; i++) {
                const ox = originalPositions[i * 3];
                const oy = originalPositions[i * 3 + 1];
                
                // Fluid wave effect
                posArray[i * 3] = ox + Math.sin(time + oy * 0.1) * 2;
                posArray[i * 3 + 1] = oy + Math.cos(time + ox * 0.1) * 2;
            }
            
            posAttr.needsUpdate = true;
            renderer.render(scene, camera);
        }

        card.addEventListener('mouseenter', () => {
            isHovered = true;
            canvas.style.opacity = '1';
            renderer.setSize(card.clientWidth, card.clientHeight);
            camera.aspect = card.clientWidth / card.clientHeight;
            camera.updateProjectionMatrix();
            animate();
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            canvas.style.opacity = '0';
            if (animationId) cancelAnimationFrame(animationId);
        });
    });
}
