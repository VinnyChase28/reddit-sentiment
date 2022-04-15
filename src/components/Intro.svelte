<script>
  export const intro = "all";
  import TickerCode from "./TickerCode.svelte";
  import CryptoCode from "./CryptoCode.svelte";
  import AnimatedGraph from "./AnimatedGraph.svelte";
  import { onMount } from "svelte";

  let frame;
  onMount(() => {
    frame.addEventListener("load", onLoad());
  });
  function onLoad() {
    const head = frame.contentDocument.querySelector("head");
    console.log(head);
  }
</script>

<h1>Reddit Scraping & Bar Charts</h1>
<p>
  This is a guide to show how to create a reddit python scraper. The top 6 most
  popular stock subreddits as well as the top 6 crypto subreddits are scraped
  using PRAW, a python library to find how many times the tickers are mentioned.
  The comment is also recorded to do a sentiment analysis of the text. The
  sentiment analysis will try to determine if the user is "Bearish" or "Bullish"
  about a particular stock or cryptocurrency.
</p>
<p>
  The start date of the Data is March 22, 2022. The ticker, time/date, and
  comment are then stored in Supabase - which similar to Firebase. The total
  results are then fetched from Supabase and rendered here using the Svelte
  framework. This project is purely a way for me to practice charting and data
  manipulation. Feel free to star this project or download if you you'd like to
  test it!
</p>

<h3>Prerequisites:</h3>
<ul>
  <li>
    A reddit account and <a
      target="_blank"
      href="https://ssl.reddit.com/prefs/apps/">app</a
    >
  </li>
  <li>
    A <a target="_blank" href="https://supabase.com/docs/">Supabase</a>
    account with two tables: <strong>crypto_mentions</strong> and
    <strong> ticker_mentions</strong>. The columns should be set up like so:
    <ul style="list-style-type: lower-alpha; padding-bottom: 0;">
      <li style="margin-left:2em">id (key)</li>
      <li style="margin-left:2em; padding-bottom: 0;">created_at</li>
      <li style="margin-left:2em; padding-bottom: 0;">ticker</li>
      <li style="margin-left:2em; padding-bottom: 0;">comment</li>
      <li style="margin-left:2em; padding-bottom: 0;">source</li>
      <li style="margin-left:2em; padding-bottom: 0;">sentiment</li>
    </ul>
  </li>
  <li>
    (Optional) A free <a target="_blank" href="https://signup.heroku.com/">
      Heroku</a
    > account for scheduling scripts, you can also simply run the script locally
  </li>
</ul>
<h3>Running stock mention numbers</h3>
<iframe
  bind:this={frame}
  src="https://flo.uri.sh/visualisation/9399885/embed"
  title="Interactive or visual content"
  class="flourish-embed-iframe"
  frameborder="0"
  scrolling="no"
  style="width:100%;height:600px;"
  sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
/>
<h3>Running crypto mention numbers</h3>
<iframe
  bind:this={frame}
  src="https://flo.uri.sh/visualisation/9412445/embed"
  title="Interactive or visual content"
  class="flourish-embed-iframe"
  frameborder="0"
  scrolling="no"
  style="width:100%;height:600px;"
  sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
/>

<h3>Stock Scraper:</h3>
<TickerCode />
<h3>Crypto Scraper:</h3>
<CryptoCode />

<h3>
  The Javascript & Svelte code can be found <a
    target="_blank"
    href="https://github.com/VinnyChase28/reddit-sentiment"
  >
    here</a
  >
</h3>

<style>
  a {
    color: #ff3e00;
    transform: underline;
  }

  h1 {
    color: #ff3e00;
    font-family: "Montserrat", sans-serif;
  }
</style>
