<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { createText, rotateText } from './axisHelper';


    let container: HTMLDivElement;
  
    onMount(() => {
        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#ffffff");

        // Convert scene to a right-hand Z-Up coordinate system
        scene.rotateX(-Math.PI/2);
        scene.rotateZ(-Math.PI/2);
        

        //Renderer
        const renderer = new THREE.WebGLRenderer();
        container.appendChild(renderer.domElement);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);    // Utilize full resolution of pixel display

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableZoom = false;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light with intensity 1
        directionalLight.position.set(5, 5, 5).normalize(); // Set position and normalize
        scene.add(directionalLight);
      
        // Create materials
        const yMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd }); // Red for Y
        const zMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd }); // Green for Z
        const xMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd }); // Blue for X

        // Create the cone geometry
        const coneGeometry = new THREE.ConeGeometry(0.1, 0.2, 320,10);

        // Create the cylinder geometry for the arrow shafts
        const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 32);

        // Create X axis arrow
        const yArrow = new THREE.Group();
        const yShaft = new THREE.Mesh(shaftGeometry, yMaterial);
        yShaft.rotation.z = Math.PI / 2;
        const yConeR = new THREE.Mesh(coneGeometry, yMaterial);
        const yConeL = new THREE.Mesh(coneGeometry, yMaterial);
        yConeR.position.x = 5;
        yConeR.rotateZ(-Math.PI/2);
        yConeL.position.x = -5;
        yConeL.rotateZ(Math.PI/2);
        
        yArrow.add(yShaft);
        yArrow.add(yConeR, yConeL);
        scene.add(yArrow);

        // Create Y axis arrow
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

        // Create Z axis arrow
        const xArrow = new THREE.Group();
        const xShaft = new THREE.Mesh(shaftGeometry, xMaterial);
        xShaft.rotation.x = Math.PI / 2;
        const xConeFront = new THREE.Mesh(coneGeometry, xMaterial);
        const xConeBack = new THREE.Mesh(coneGeometry, xMaterial);
        xConeFront.position.z = 5;
        xConeBack.position.z = -5;
        xConeFront.rotateX(Math.PI / 2);
        xConeBack.rotateX(-Math.PI / 2);
        xArrow.add(xShaft);
        xArrow.add(xConeFront, xConeBack);
        scene.add(xArrow);


        // Create and add 3D text labels
        const xLabel = createText('X', new THREE.Vector3(5.3, 0, 0), '0xdddddd');
        const yLabel = createText('Y', new THREE.Vector3(0, 5.3, 0), '0xdddddd');
        const zLabel = createText('Z', new THREE.Vector3(0, 0, 5.3), '0xdddddd');
        zLabel.rotateX(-Math.PI/2);

        scene.add(xLabel);
        scene.add(yLabel);
        scene.add(zLabel);

        // Set camera position
        camera.position.set(5.5,5.5,5.5);
        controls.update();

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
            rotateText(xLabel, camera); rotateText(yLabel, camera); rotateText(xLabel, camera);
        }
        renderer.setAnimationLoop( animate );

    });
</script>
  
<div bind:this={container} style="width: 100%; height: 100%; padding: 0; margin:0;"></div>
  
<style>
    div {
        overflow: hidden;
    }
    .label {
        color: black;
        font-size: 20px;
        font-family: Arial, sans-serif;
    }
</style>
  