<script>
  export const guide = "all";
  import { onMount } from "svelte";
  import Highlight from "svelte-highlight";
  import bash from "svelte-highlight/languages/bash";
  import python from "svelte-highlight/languages/python";
  import nord from "svelte-highlight/styles/nord";
  import FramesCrypto from "./FramesCrypto.svelte";
  import {
    intro,
    textOne,
    textTwo,
    textThree,
    textFour,
    textFive,
    textSix,
    textSeven,
    bashOne,
    bashTwo,
    bashThree,
    pythonOne,
    pythonTwo,
    pythonThree,
    pythonFour,
    pythonFive,
    pythonSix,
    pythonSeven,
    pythonEight,
    pythonNine,
    env,
  } from "./CodeData";
</script>

<svelte:head>
  {@html nord}
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Montserrat&display=swap");
  </style>
</svelte:head>
<main>
  <div class="container">
    <h1>Finance forum scraping guide</h1>
    <FramesCrypto />
    <div>{intro}</div>

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
    <h3>Python Code</h3>
    <p>Let's open ticker-scraper-stocks.py and import our libraries</p>
    <Highlight language={python} code={pythonOne} />
    <p>
      We are now ready to create a list of all existing stocks as well as
      connect to the Reddit API via PRAW. Ensure to replace YourAppName and
      u/your-username with your real info.
    </p>
    <Highlight language={python} code={pythonTwo} />
    <p>
      Now, we can fetch the post URL's. We need to make sure that the link to
      the fetched posts contains comments.
    </p>
    <Highlight language={python} code={pythonThree} />
    <p>
      Once we know all the submissions have comments, we can add all the
      submission id's to a new array:
    </p>
    <Highlight language={python} code={pythonFour} />
    <p>
      We can define a function called <strong>words_in_string</strong> that will
      allow us to break the reddit comment in an array of strings. We check to see
      if one of the words in the array exists in our previously generated stock symbol
      list. If so, we grab that whole comment, the ticker and send it off to lower
      Supabase's IQ.
    </p>
    <Highlight language={python} code={pythonFive} />
    <p>
      (Optional) To schedule your Heroku script to run daily as a cron job,
      you'll have to install a scheduler, declare a runtime and create a
      Procfile.
    </p>
    <p>In the root directory, create a Procfile:</p>
    <Highlight code={textSix} />
    <p>Then, create a runtime.txt file and choose the runtime:</p>
    <Highlight code={textSeven} />

    <p>Full code:</p>
    <Highlight language={python} code={pythonSix} />

    <h3>Bonus:</h3>

    <p>
      To create a cool visualization using the data we have scraped, we can use <a
        href="https://app.flourish.studio/@flourish/bar-chart-race"
        target="_blank"
      >
        Flourish</a
      >'s racing bar chart. This chart accepts a CSV that requires a cumulative
      sum of occurrences of a stock (y-axis) over a period of time (x-axis).
      Pandas makes it very easy to work with .csv files.
    </p>

    <p>
      Let's open to-csv.py and declare our imports again, as well as initialize
      Supabase:
    </p>
    <Highlight language={python} code={pythonSeven} />

    <p>
      Next, we need to ensure that all of our columns and rows are unique based
      on the data we fetched from Supabase:
    </p>
    <Highlight language={python} code={pythonEight} />

    <p>
      Finally, we can create a dataframe using Pandas and create a CSV once we
      know the dataframe has the data we want:
    </p>
    <Highlight language={python} code={pythonNine} />

    <div class="empty-space" />
  </div>
</main>

<style>
  .empty-space {
    padding: 200px;
  }
  .container {
    justify-content: center;
    margin-top: 100px;
    height: 100%;
    background-color: #222222;
  }
  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
