import * as THREE from 'three';

const initialSize = 10;

export class DynamicGridHelper {
    private gridHelper: THREE.GridHelper;
    private size: number;
    private divisions: number;
    private defaultSize: number;
    private defaultDivisions: number;
    private zoomFactor: number;
    private scene: THREE.Scene;
    private container: HTMLDivElement;

    constructor(size: number, divisions: number, scene: THREE.Scene, container: HTMLDivElement) {
        this.size = size;
        this.divisions = divisions;
        this.defaultSize = size;
        this.defaultDivisions = divisions;
        this.zoomFactor = 1;
        this.scene = scene;
        this.container = container;
        this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
        this.gridHelper.rotateX(Math.PI / 2);
        this.scene.add(this.gridHelper);
        container.addEventListener('wheel', (event) => {
            const delta = Math.sign(event.deltaY);
            const sensitivity = 0.1;
            this.zoomFactor -= delta * sensitivity;
            this.zoomFactor = Math.max(0.1, this.zoomFactor); // Prevent zooming out too far
            console.log(this.zoomFactor);
            this.updateGrid();
        });
    }

    //BUG: Once number of divisions becomes smaller than half of default Divisions or more than double of defauly divisions, newDivisions is locked at defaultDivisions  
    updateGrid(): void {
        this.scene.remove(this.gridHelper);
        let newDivisions: number = Math.round(this.defaultDivisions * this.zoomFactor);
        if (newDivisions <= this.defaultDivisions / 2 || newDivisions >= this.defaultDivisions * 2) {
            newDivisions = this.defaultDivisions;
        }
        this.gridHelper = new THREE.GridHelper(initialSize, newDivisions);
        this.gridHelper.rotateX(Math.PI / 2);
        this.scene.add(this.gridHelper);
    }

    getZoomFactor(): number {
        return this.zoomFactor;
    }
}
