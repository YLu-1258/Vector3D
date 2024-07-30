import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json"

const helvetikerRegular = new FontLoader().parse(helvetiker)

const textOptions = {
    font: helvetikerRegular,
    size: .2,
    depth: .02
}

export function createText(text: string, position: THREE.Vector3, color: string): THREE.Mesh{
    const geometry = new TextGeometry(text, textOptions);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.copy(position);
    return textMesh;
}

export function rotateText(mesh: THREE.Mesh, camera:THREE.PerspectiveCamera) {
    mesh.lookAt(camera.position);
}