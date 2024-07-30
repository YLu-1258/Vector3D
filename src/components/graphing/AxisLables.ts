// src/components/AxisLabels.ts
import * as THREE from 'three';
import { createText } from './AxisHelper';

export interface AxisLabelCollection {
    xLabel: THREE.Mesh;
    yLabel: THREE.Mesh;
    zLabel: THREE.Mesh;
}

export function createAxisLabels(scene: THREE.Scene): AxisLabelCollection {
    const xLabel = createText('X', new THREE.Vector3(5.3, 0, 0), '#dddddd');
    const yLabel = createText('Y', new THREE.Vector3(0, 5.3, 0), '#dddddd');
    const zLabel = createText('Z', new THREE.Vector3(0, 0, 5.3), '#dddddd');
    zLabel.rotateX(-Math.PI / 2);

    scene.add(xLabel);
    scene.add(yLabel);
    scene.add(zLabel);

    return { xLabel, yLabel, zLabel };
}

export function rotateAxisLables(mesh: THREE.Mesh, camera:THREE.PerspectiveCamera) {
    mesh.lookAt(camera.position);
}
