<!-- Gist.svelte -->
<script>
  export const animatedgraph = "all";

  export let dataUrl = "https://public.flourish.studio/resources/embed.js";

  import { onMount } from "svelte";

  let frame;
  onMount(() => {
    frame.srcdoc = `<script src='${dataUrl}.js'><${""}/script>`;
  });
</script>

<iframe src="about:blank" bind:this={frame} title="Flourish" />

<style>
  iframe {
    border: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
