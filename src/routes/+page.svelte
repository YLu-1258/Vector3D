<script>
    import Navbar from '../components/navbar/Navbar.svelte';
    import Equationcanvas from '../components/equations/EquationCanvas.svelte';
    import Graphingcanvas from '../components/graphing/GraphingCanvas.svelte';
    import '../assets/css/reset.css';
</script>

<style>
    .container {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    .content {
        width: 100%;
        height: 95%;
        flex: 1;
        display: flex;
        align-items: stretch;
    }

</style>

<div class="container">
    <Navbar />
    <div class="content">
      <Equationcanvas />
      <Graphingcanvas />
    </div>
</div>
