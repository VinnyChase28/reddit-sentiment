<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import _ from "lodash";
  let tickers;
  let newArray = [];
  let trackObj = {};
  let finalData = null;
  onMount(async () => {
    const { data, error } = await supabase
      .from("ticker_mentions")
      .select("ticker");
    tickers = (await data) || [];
    tickers?.forEach((element) => newArray.push(element["ticker"]));
    newArray?.forEach(function (el) {
      trackObj[el] = trackObj[el] + 1 || 1;
    });
    const arrayOfObj = Object.entries(trackObj).map((e) => ({
      ticker: e[0],
      count: e[1],
    }));
    finalData = arrayOfObj.sort((a, b) => (a.count < b.count ? 1 : -1));
    console.log(finalData);
  });
  // do something with our fetched data
</script>

<main>
  {#if finalData}
    {#each finalData as { ticker, count }}
      <tr>
        <td>{ticker}</td>
        <td>{count}</td>
      </tr>
    {/each}
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
