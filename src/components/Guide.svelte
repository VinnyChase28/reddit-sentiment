<script>
  export const guide = "all";
  import TickerCode from "./TickerCode.svelte";
  import CryptoCode from "./CryptoCode.svelte";
  import { onMount } from "svelte";
  import Highlight from "svelte-highlight";
  import bash from "svelte-highlight/languages/bash";
  import python from "svelte-highlight/languages/python";
  import dracula from "svelte-highlight/styles/dracula";
  import {
    textOne,
    textTwo,
    textThree,
    textFour,
    bashOne,
    bashTwo,
    bashThree,
    pythonOne,
    pythonTwo,
    env,
  } from "./CodeData";
  console.log(bashOne);

  let frame;
  onMount(() => {
    frame.addEventListener("load", onLoad());
  });
  function onLoad() {
    const head = frame.contentDocument.querySelector("head");
    console.log(head);
  }
</script>

<svelte:head>
  {@html dracula}
</svelte:head>

<h1>Finance forum scraping</h1>
<p>
  This is a guide to show how to create a reddit python scraper, as well as
  create a CSV file that will work with very cool charting software, Flourish. I
  will start with reddit, and expand to other websites. The top 6 most popular
  stock subreddits as well as the top 6 crypto subreddits are scraped using
  PRAW, a python library to find how many times the tickers are mentioned. The
  comment is also recorded to do a sentiment analysis of the text. The sentiment
  analysis will try to determine if the user is "Bearish" or "Bullish" about a
  particular stock or cryptocurrency.
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
  <li>Python3 and Node.Js installed</li>
  <li>I will be using Ubuntu as my os for this guide & VSCode as my IDE</li>
  <li>
    (Optional) A free <a target="_blank" href="https://signup.heroku.com/">
      Heroku</a
    > account for scheduling scripts, you can also simply run the script locally
  </li>
</ul>
<h3>Python project setup</h3>
<p>
  {textOne}
</p>
<Highlight language={bash} code={bashOne} />
<p>
  {textTwo}
</p>
<Highlight language={bash} code={bashTwo} />
<p>{textThree}</p>
<Highlight language={bash} code={bashThree} />
<p>Create a .env file with all of the environment variables:</p>
<Highlight code={env} />

<p>Let's open ticker-scraper-stocks.py and import our libraries</p>

<Highlight language={python} code={pythonOne} />

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
    padding: 20px;
  }
  h3 {
    color: #ff3e00;
    padding: 20px;
  }
  pre {
    background-color: white;
    box-shadow: #ff3e00;
    border-radius: 10px;
  }

  .custom-code {
    background-color: white;
    box-shadow: #ff3e00;
    border-radius: 10px;
  }
</style>
