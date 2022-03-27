<!-- Gist.svelte -->
<script>
  export const code = "all";

  export let gistUrl =
    "https://gist.github.com/VinnyChase28/c36f8bc951941b474c0c5dcd6cb9c65f";

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
