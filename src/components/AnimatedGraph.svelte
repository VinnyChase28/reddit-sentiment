<!-- Gist.svelte -->
<script>
  export const animatedgraph = "all";

  export let dataUrl =
    "https://public.flourish.studio/visualisation/9399885/?utm_source=embed&utm_campaign=visualisation/9399885";

  import { onMount } from "svelte";

  let frame;
  onMount(() => {
    frame.srcdoc = `<script src='${dataUrl}.js'><${""}/script>`;
    console.log("loaded");
  });
</script>

<iframe
  src="about:blank"
  bind:this={frame}
  title="Interactive or visual content"
  class="flourish-embed-iframe"
/>
<div style="width:100%!;margin-top:4px!important;text-align:right!important;">
  <a
    class="flourish-credit"
    href="https://public.flourish.studio/visualisation/9399885/?utm_source=embed&utm_campaign=visualisation/9399885"
    target="_top"
    style="text-decoration:none!important"
    ><img
      alt="Made with Flourish"
      src="https://public.flourish.studio/resources/made_with_flourish.svg"
      style="width:105px!important;height:16px!important;border:none!important;margin:0!important;"
    />
  </a>
</div>

<style>
  iframe {
    border: 0;
    width: 100%;
    height: auto;
    overflow: hidden;
  }
</style>
