<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let container: HTMLDivElement;
  
    onMount(() => {
        // Scene
      
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        container.appendChild(renderer.domElement);
        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        
  
        // Renderer
      
        renderer.setSize(container.clientWidth, container.clientHeight);
      
  
        // Create materials
        const xMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for X
        const yMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green for Y
        const zMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue for Z

        // Create the cone geometry
        const coneGeometry = new THREE.ConeGeometry(0.1, 0.2, 32);

        // Create the cylinder geometry for the arrow shafts
        const shaftGeometry = new THREE.CylinderGeometry(0.02, 0.02, 10, 32);

        // Create X axis arrow
        const xArrow = new THREE.Group();
        const xShaft = new THREE.Mesh(shaftGeometry, xMaterial);
        xShaft.rotation.z = Math.PI / 2;
        const xConeR = new THREE.Mesh(coneGeometry, xMaterial);
        const xConeL = new THREE.Mesh(coneGeometry, xMaterial);
        xConeR.position.x = 5;
        xConeR.rotation.z = -1*Math.PI/2;
        xConeR.rotation.y = -Math.PI/4;
        xConeL.position.x = -5;
        xConeL.rotation.z = Math.PI/2;
        xConeL.rotation.y = Math.PI/4;
        xArrow.add(xShaft);
        xArrow.add(xConeR, xConeL);
        scene.add(xArrow);

        // Create Y axis arrow
        const yArrow = new THREE.Group();
        const yShaft = new THREE.Mesh(shaftGeometry, yMaterial);
        const yConeUp = new THREE.Mesh(coneGeometry, yMaterial);
        const yConeDown = new THREE.Mesh(coneGeometry, yMaterial);
        yConeUp.position.y = 5;
        yConeDown.position.y = -5;
        yConeDown.rotateX(3*Math.PI/4);

        yArrow.add(yShaft);
        yArrow.add(yConeUp, yConeDown);
        scene.add(yArrow);

        // Create Z axis arrow
        const zArrow = new THREE.Group();
        const zShaft = new THREE.Mesh(shaftGeometry, zMaterial);
        zShaft.rotation.x = Math.PI / 2;
        const zConeFront = new THREE.Mesh(coneGeometry, zMaterial);
        const zConeBack = new THREE.Mesh(coneGeometry, zMaterial);
        zConeFront.position.z = 5;
        zConeBack.position.z = -5;
        zConeFront.rotateX(Math.PI / 2);
        zConeBack.rotateX(-Math.PI / 2);
        zArrow.add(zShaft);
        zArrow.add(zConeFront, zConeBack);
        scene.add(zArrow);

        // Set camera position
        camera.position.z = 3*Math.sqrt(11);
        camera.position.x = 2*Math.sqrt(11);
        camera.position.y = 0.5*Math.sqrt(11);
        camera.rotation.y = 0;
        camera.rotation.x = 0;
        camera.rotation.z = 0;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop( animate );

    });
  </script>
  
  <div bind:this={container} style="width: 100%; height: 100%; padding: 0; margin:0;"></div>
  
  <style>
    div {
      overflow: hidden;
    }
  </style>
  