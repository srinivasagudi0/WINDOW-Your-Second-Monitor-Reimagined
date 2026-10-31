import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
camera.position.z = 5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshNormalMaterial()
);

scene.add(cube);

const renderer = new THREE.WebGLRenderer();
renderer.render(scene, camera);