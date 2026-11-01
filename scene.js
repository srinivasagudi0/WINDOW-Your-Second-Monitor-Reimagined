import * as THREE from 'three';

// 1. Create the 3D scene
const scene = new THREE.Scene();

// 2. Create the camera
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);

// 3. Connect Three.js to the HTML canvas
const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 4. Load the 360° forest image
const loader = new THREE.TextureLoader();

loader.load(
    'assets/environments/nature_reserve_forest_4k.jpeg',

    function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        scene.background = texture;
    },

    undefined,

    function(error) {
        console.error("Failed to load forest image:", error);
    }
);

// 5. Mouse controls
let dragging = false;
let previousX = 0;
let previousY = 0;

let yaw = 0;
let pitch = 0;

canvas.addEventListener('pointerdown', function(event) {
    dragging = true;

    previousX = event.clientX;
    previousY = event.clientY;

    canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener('pointerup', function() {
    dragging = false;
});

canvas.addEventListener('pointercancel', function() {
    dragging = false;
});

canvas.addEventListener('pointermove', function(event) {
    if (!dragging) return;

    yaw -= (event.clientX - previousX) * 0.004;
    pitch -= (event.clientY - previousY) * 0.004;

    pitch = THREE.MathUtils.clamp(
        pitch,
        -Math.PI / 2 + 0.05,
        Math.PI / 2 - 0.05
    );

    previousX = event.clientX;
    previousY = event.clientY;
});

// 6. Make the canvas responsive
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

// 7. Render the environment
function animate() {
    camera.rotation.order = 'YXZ';

    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();