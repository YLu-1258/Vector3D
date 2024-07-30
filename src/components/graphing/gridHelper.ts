import * as THREE from 'three';
import { createText } from './axisHelper'; // Import the TextHelper class
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Create grids and add them to the scene
export function createGrids(scene: THREE.Scene, size: number, divisions: number) {
    const gridXY = new THREE.GridHelper(size, divisions);
    const gridYZ = new THREE.GridHelper(size, divisions);
    const gridXZ = new THREE.GridHelper(size, divisions);

    // Position grids
    gridXY.rotation.x = Math.PI / 2;
    gridYZ.rotation.z = Math.PI / 2;

    scene.add(gridXY);
    scene.add(gridYZ);
    scene.add(gridXZ);
}

// Create labels and add them to the scene
export function createLabels(scene: THREE.Scene, size: number) {
    // Remove existing labels if any
    scene.traverse(object => {
        if (object instanceof THREE.Mesh && object.geometry instanceof TextGeometry) {
            scene.remove(object);
        }
    });

    const step = 1;

    for (let i = -size / 2; i <= size / 2; i += step) {
        const xLabel = createText(i.toFixed(0), new THREE.Vector3(i, 0, 0), 'red');
        const yLabel = createText(i.toFixed(0), new THREE.Vector3(0, i, 0), 'green');
        const zLabel = createText(i.toFixed(0), new THREE.Vector3(0, 0, i), 'blue');

        if (xLabel) scene.add(xLabel);
        if (yLabel) scene.add(yLabel);
        if (zLabel) scene.add(zLabel);
    }
}

// Update labels to face the camera
export function updateLabels(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    scene.traverse(object => {
        if (object instanceof THREE.Mesh && object.geometry instanceof TextGeometry) {
            object.lookAt(camera.position);
        }
    });
}
