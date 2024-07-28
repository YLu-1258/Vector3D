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
      camera.position.z = 5;
  
      // Renderer
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      
  
      // Axes
      const materialX = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const materialY = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const materialZ = new THREE.LineBasicMaterial({ color: 0x0000ff });
  
      const pointsX = [new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)];
      const geometryX = new THREE.BufferGeometry().setFromPoints(pointsX);
      const lineX = new THREE.Line(geometryX, materialX);
  
      const pointsY = [new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)];
      const geometryY = new THREE.BufferGeometry().setFromPoints(pointsY);
      const lineY = new THREE.Line(geometryY, materialY);
  
      const pointsZ = [new THREE.Vector3(0, 0, -5), new THREE.Vector3(0, 0, 5)];
      const geometryZ = new THREE.BufferGeometry().setFromPoints(pointsZ);
      const lineZ = new THREE.Line(geometryZ, materialZ);
  
      scene.add(lineX, lineY, lineZ);
  
      // Grid Helper
      const gridHelper = new THREE.GridHelper(10, 10);
      scene.add(gridHelper);
  
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
  
      animate();
  
      return () => {
        // Clean up
        container.removeChild(renderer.domElement);
      };
    });
  </script>
  
  <div bind:this={container} style="width: 100%; height: 100vh;"></div>
  
  <style>
    div {
      overflow: hidden;
    }
  </style>
  