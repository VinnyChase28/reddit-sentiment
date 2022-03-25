<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import Code from "./components/Code.svelte";
  import _ from "lodash";
  let arr2 = [];
  let barCharArray = [];
  let stock1 = null;
  let stock2 = null;
  let stock3 = null;
  let stock4 = null;
  let stock5 = null;
  let stock1Percentage = null;
  let stock2Percentage = null;
  let stock3Percentage = null;
  let stock4Percentage = null;
  let stock5Percentage = null;
  onMount(async () => {
    const { data, error } = await supabase.from("ticker_mentions").select(`
    ticker,
    comment,
    created_at
  `);
    const response = await data;
    function findOcc(arr, key) {
      arr.forEach((x) => {
        // Checking if there is any object in arr2
        // which contains the key value
        if (
          arr2.some((val) => {
            return val[key] == x[key];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arr2.forEach((k) => {
            if (k[key] === x[key]) {
              k["occurrence"]++;
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          let a = {};
          a[key] = x[key];
          a["occurrence"] = 1;
          arr2.push(a);
        }
        arr2 = _.sortBy(arr2, "occurrence").reverse();

        return arr2;
      });
    }
    let key = "ticker";
    findOcc(response, key);
    barCharArray = arr2.slice(0, 5);
    //lets do some math with the top 5 mentioned stocks. we want the total number of mentions for the top 5, then we canculate the percentage of mentions of the total for each stock. This will determine how we will render the bars chart.
    console.log(barCharArray);
    //helper function for percentage
    const calculatePercentage = (x, y) => {
      return Math.round((x / y) * 100);
    };

    let totalTop5 = barCharArray
      .map((item) => item.occurrence)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(totalTop5);
    stock1 = barCharArray[0].ticker;
    stock1Percentage = calculatePercentage(
      barCharArray[0].occurrence,
      totalTop5
    );
    stock2 = barCharArray[1].ticker;
    stock2Percentage = calculatePercentage(
      barCharArray[1].occurrence,
      totalTop5
    );
    stock3 = barCharArray[2].ticker;
    stock3Percentage = calculatePercentage(
      barCharArray[2].occurrence,
      totalTop5
    );
    stock4 = barCharArray[3].ticker;
    stock4Percentage = calculatePercentage(
      barCharArray[3].occurrence,
      totalTop5
    );
    stock5 = barCharArray[4].ticker;
    stock5Percentage = calculatePercentage(
      barCharArray[4].occurrence,
      totalTop5
    );

    arr2 = arr2; //do this because dummy svelte wants a re-render.
  });
</script>

<main>
  <div class="container">
    <h1>Reddit Scraping & Bar Charts</h1>
    <p>
      Hi there, this is a portfolio project to showcase a few features. I
      created a reddit python scraper <a
        target="_blank"
        href="https://github.com/VinnyChase28/python-ticker-scraper">here</a
      >. The top 3 most popular stock subreddits are scraped using PRAW, a
      python library. The start date is March 22, 2022. The ticker, time/date,
      and comment are then stored in Supabase - which similar to Firebase. The
      total results are then fetched from the SQL database on this page onMount,
      using the Svelte Framework, which allows for nearly pure HTML, CSS,
      Javascript code.
    </p>

    <h5>
      Fetch the data from reddit -> scan the comment for tickers by comparing it
      to a list of tickers -> if found, push comment and ticker to DB
    </h5>
    <Code />

    <h5>
      We can now fetch the data and render it with svelte. That code can be
      found <a
        target="_blank"
        href="https://github.com/VinnyChase28/reddit-sentiment">here</a
      >
    </h5>

    <table class="graph">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Percent</th>
        </tr>
      </thead>

      <tbody>
        <tr style="height:{stock1Percentage}%">
          <th scope="row">{stock1}</th>
          <td><span>{stock1Percentage + "%"}</span></td>
        </tr>
        <tr style="height:{stock2Percentage}%">
          <th scope="row">{stock2}</th>
          <td><span>{stock2Percentage + "%"}</span></td>
        </tr>
        <tr style="height:{stock3Percentage}%">
          <th scope="row">{stock3}</th>
          <td><span>{stock3Percentage + "%"}</span></td>
        </tr>
        <tr style="height:{stock4Percentage}%">
          <th scope="row">{stock4}</th>
          <td><span>{stock4Percentage + "%"}</span></td>
        </tr>
        <tr style="height:{stock5Percentage}%">
          <th scope="row">{stock5}</th>
          <td><span>{stock5Percentage + "%"}</span></td>
        </tr>
      </tbody>
    </table>

    <table id="customers">
      <th>Ticker </th>
      <th>All Time Mentions </th>
      {#each arr2 as { ticker, occurrence }}
        <tr>
          <td class="sent bar">{ticker}</td>
          <td>{occurrence}</td>
        </tr>
      {/each}
    </table>
  </div>
</main>

<style>
  main {
    max-width: 240px;
    margin: 200 auto;
  }
  td {
    height: 10px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    text-align: center;
  }

  .container {
    padding: 50px;
    text-align: left;
    align-items: center;
    padding: 30px;
  }

  /* barchart */

  .graph {
    margin-bottom: 0em;
    font: normal 100%/150% arial, helvetica, sans-serif;
  }

  .graph caption {
  }

  .graph tbody th {
    text-align: right;
  }

  @supports (display: grid) {
    @media (min-width: 32em) {
      .graph {
        display: block;
        width: 600px;
        height: 300px;
        margin-bottom: 100px;
      }

      .graph caption {
        display: block;
      }

      .graph thead {
        display: none;
      }

      .graph tbody {
        position: relative;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(2em, 1fr));
        column-gap: 2.5%;
        align-items: end;
        height: 100%;
        padding: 0 1em;
        border-bottom: 2px solid rgba(0, 0, 0, 0.5);
        background: repeating-linear-gradient(
          180deg,
          rgba(170, 170, 170, 0.7) 0,
          rgba(170, 170, 170, 0.7) 1px,
          transparent 1px,
          transparent 20%
        );
      }

      .graph tbody:before,
      .graph tbody:after {
        position: absolute;
        left: -3.2em;
        width: 2.8em;
        text-align: right;
        font: bold 80%/120% arial, helvetica, sans-serif;
      }

      .graph tbody:before {
        content: "100%";
        top: -0.6em;
      }

      .graph tbody:after {
        content: "0%";
        bottom: -0.6em;
      }

      .graph tr {
        position: relative;
        display: block;
      }

      .graph tr:hover {
        z-index: 999;
      }

      .graph th,
      .graph td {
        display: block;
        text-align: center;
      }

      .graph tbody th {
        position: absolute;
        top: -3em;
        left: 0;
        width: 100%;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
        text-indent: 0;
        transform: rotate(-45deg);
      }

      .graph tbody th:after {
        content: "";
      }

      .graph td {
        width: 100%;
        height: 100%;
        background: #f63;
        border-radius: 0.5em 0.5em 0 0;
        transition: background 0.5s;
      }

      .graph tr:hover td {
        opacity: 0.7;
      }

      .graph td span {
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        padding: 0.5em 0;
        margin: -1em 0 0;
        font: normal 85%/120% arial, helvetica, sans-serif;
        /* 			background:white; */
        /* 			box-shadow:0 0 0.25em rgba(0,0,0,0.6); */
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.5s;
        color: white;
      }

      .toggleGraph:checked + table td span,
      .graph tr:hover td span {
        width: 4em;
        margin-left: -2em; /* 1/2 the declared width */
        opacity: 1;
      }
    } /* min-width:32em */
  } /* grid only */

  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    text-align: left;
    background-color: #ff3e00;
    color: white;
  }

  table {
    width: 100%;
    border: 1px solid;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
