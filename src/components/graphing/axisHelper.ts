// src/components/axisHelper.ts
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json"

export function createText(text: string, position: THREE.Vector3, color: string): THREE.Mesh {
    const loader = new FontLoader();
    const font = loader.parse(helvetiker); // Adjust as needed

    const geometry = new TextGeometry(text, {
        font: font,
        size: 0.2,
        height: 0.02
    });
    const material = new THREE.MeshStandardMaterial({ color: color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.copy(position);

    return textMesh;
}

export function rotateText(textMesh: THREE.Mesh, camera: THREE.PerspectiveCamera): void {
    // Update textMesh rotation based on camera position
    textMesh.lookAt(camera.position);
}
