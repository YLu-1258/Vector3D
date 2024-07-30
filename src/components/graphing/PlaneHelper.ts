// import * as THREE from 'three';

// const gridHelper = new THREE.GridHelper(10,20); 

// export function createPlane(scene: THREE.Scene): void {
//     let XYPlane : THREE.GridHelper = gridHelper.clone();
//     XYPlane.rotateX(Math.PI/2);
//     scene.add(XYPlane);
// }

import * as THREE from 'three';

const initialSize = 10;
const initialDivisions = 20;
const minDivisions = 2;
const maxDivisions = 100;

export class DynamicGridHelper {
    private gridHelper: THREE.GridHelper;
    private size: number;
    private divisions: number;
    private scene: THREE.Scene;
    private container: HTMLDivElement;

    constructor(size: number, divisions: number, scene: THREE.Scene, container: HTMLDivElement) {
        this.size = size;
        this.divisions = divisions;
        this.scene = scene;
        this.container = container;
        this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
        this.gridHelper.rotateX(Math.PI / 2);
        this.scene.add(this.gridHelper);
        container.addEventListener('wheel', (event) => {
            const delta = Math.sign(event.deltaY);
            const sensitivity = 0.5;
            const newDivisions = this.divisions - delta * 2;
            if (newDivisions >= minDivisions && newDivisions <= maxDivisions) {
                this.updateDivisions(newDivisions);
            }
        });
    }

    updateDivisions(newDivisions: number): void {
        this.scene.remove(this.gridHelper);
        this.divisions = newDivisions;
        this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
        this.gridHelper.rotateX(Math.PI / 2);
        this.scene.add(this.gridHelper);
    }
}