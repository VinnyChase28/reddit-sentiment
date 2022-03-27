<!-- Gist.svelte -->
<script>
  export const cryptocode = "all";

  export let gistUrl =
    "https://gist.github.com/VinnyChase28/8828237b22178db7e7f4f14fede93bc3";

  import { onMount } from "svelte";

  let frame;
  onMount(() => {
    frame.srcdoc = `<script src='${gistUrl}.js'><${""}/script>`;
  });
</script>

<iframe src="about:blank" bind:this={frame} title="Gist" />

<style>
  iframe {
    border: 0;
    width: 100%;
    height: 350px;
  }
</style>
