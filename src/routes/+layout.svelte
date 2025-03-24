<!-- File: src/routes/+layout.svelte -->
<script lang="ts">
  // No exported data since it's unused
</script>

<main class="p-8 max-w-xl mx-auto">
  <slot />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>


