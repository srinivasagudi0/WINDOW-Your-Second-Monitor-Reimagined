import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: 0x3b7a26,
        side: THREE.DoubleSide
    })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(5, 10, 5);
scene.add(sunlight);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 5. Make the scene responsive
function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
}

window.addEventListener('resize', resize);
resize();

// 6. Animate the cube
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();