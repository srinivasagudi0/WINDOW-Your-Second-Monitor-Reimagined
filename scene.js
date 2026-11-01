import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
camera.position.z = 5;

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: 0x3b7a26,
        side: THREE.DoubleSide
    })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);
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
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();