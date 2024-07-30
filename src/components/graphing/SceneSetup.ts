// src/components/SceneSetup.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface SceneSetupResult {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
}

export function setupScene(container: HTMLDivElement): SceneSetupResult {
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    // Convert scene to a right-hand Z-Up coordinate system
    scene.rotateX(-Math.PI / 2);
    scene.rotateZ(-Math.PI / 2);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    return { scene, renderer, camera, controls };
}
