// src/components/Axis.ts
import * as THREE from 'three';

export function createAxis(scene: THREE.Scene): void {
    // Create materials
    const yMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const zMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const xMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });

    // Create the cone geometry
    const coneGeometry = new THREE.ConeGeometry(0.1, 0.2, 320, 10);

    // Create the cylinder geometry for the arrow shafts
    const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 32);

    // Create Y axis arrow
    const yArrow = new THREE.Group();
    const yShaft = new THREE.Mesh(shaftGeometry, yMaterial);
    yShaft.rotateZ(Math.PI / 2);
    const yConeR = new THREE.Mesh(coneGeometry, yMaterial);
    const yConeL = new THREE.Mesh(coneGeometry, yMaterial);
    yConeR.position.x = 5;
    yConeR.rotateZ(-Math.PI / 2);
    yConeL.position.x = -5;
    yConeL.rotateZ(Math.PI / 2);

    yArrow.add(yShaft);
    yArrow.add(yConeR, yConeL);
    scene.add(yArrow);

    // Create Z axis arrow
    const zArrow = new THREE.Group();
    const zShaft = new THREE.Mesh(shaftGeometry, zMaterial);
    const zConeUp = new THREE.Mesh(coneGeometry, zMaterial);
    const zConeDown = new THREE.Mesh(coneGeometry, zMaterial);
    zConeUp.position.y = 5;
    zConeDown.position.y = -5;
    zConeDown.rotateX(Math.PI);

    zArrow.add(zShaft);
    zArrow.add(zConeUp, zConeDown);
    scene.add(zArrow);

    // Create X axis arrow
    const xArrow = new THREE.Group();
    const xShaft = new THREE.Mesh(shaftGeometry, xMaterial);
    xShaft.rotateX(Math.PI / 2);
    const xConeFront = new THREE.Mesh(coneGeometry, xMaterial);
    const xConeBack = new THREE.Mesh(coneGeometry, xMaterial);
    xConeFront.position.z = 5;
    xConeBack.position.z = -5;
    xConeFront.rotateX(Math.PI / 2);
    xConeBack.rotateX(-Math.PI / 2);
    xArrow.add(xShaft);
    xArrow.add(xConeFront, xConeBack);
    scene.add(xArrow);
}
