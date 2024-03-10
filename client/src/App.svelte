<script lang="ts">
  import Content from './components/Content.svelte';
  import Header from './components/Header.svelte';
</script>

<main class="main">
  <Header></Header>
  <Content></Content>
</main>

<style lang="postcss">
  .main {
    width: 100%;
    height: 100vh;
  }
</style>
