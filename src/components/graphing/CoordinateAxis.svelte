<script lang="ts">
    import { onMount } from 'svelte';
    import type { SceneSetupResult } from './SceneSetup';
    import type { AxisLabelCollection } from './AxisLablesHelper'
    import { setupScene } from './SceneSetup';
    import { createAxis } from './Axis';
    import { createAxisLabels, rotateAxisLables } from './AxisLablesHelper';
    import { DynamicGridHelper } from './PlaneHelper';


    let container: HTMLDivElement;
  
    onMount(() => {
        // Setup functions for scene and coordinate axis
        const { scene, renderer, camera, controls }: SceneSetupResult = setupScene(container);
        createAxis(scene);
        const { xLabel, yLabel, zLabel }: AxisLabelCollection = createAxisLabels(scene);
        const GridHelper = new DynamicGridHelper(10,20,scene, container);
    
        // Set camera position
        camera.position.set(5.7,5.7,5.7);
        controls.update();

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
            rotateAxisLables(xLabel, camera);
            rotateAxisLables(yLabel, camera);
            rotateAxisLables(zLabel, camera);
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
  