<script>
  import { onMount } from "svelte";
  export const frames = "all";
  let frame;
  onMount(() => {
    frame.addEventListener("load", onLoad());
    console.log("loaded");
  });
  function onLoad() {
    const head = frame.contentDocument.querySelector("head");
    console.log(head);
  }
</script>

<iframe
  bind:this={frame}
  src="https://flo.uri.sh/visualisation/9412445/embed"
  title="Interactive or visual content"
  class="flourish-embed-iframe"
  frameborder="0"
  scrolling="no"
  style="width:100%;height:400px;"
  sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
/>

<style>
  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
