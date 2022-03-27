<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import Intro from "./components/Intro.svelte";
  import StockGraph from "./components/StockGraph.svelte";
  import _ from "lodash";
  let arr2 = [];
  let barCharArray = [];
  let stock1;
  let stock2;
  let stock3;
  let stock4;
  let stock5;
  let stock1Percentage;
  let stock2Percentage;
  let stock3Percentage;
  let stock4Percentage;
  let stock5Percentage;
  let arrCrypto2 = [];
  let barCharArrayCrypto = [];
  let crypto1;
  let crypto2;
  let crypto3;
  let crypto4;
  let crypto5;
  let crypto1Percentage;
  let crypto2Percentage;
  let crypto3Percentage;
  let crypto4Percentage;
  let crypto5Percentage;
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

  //get crypto data
  onMount(async () => {
    const { data, error } = await supabase.from("crypto_mentions").select(`
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
          arrCrypto2.some((val) => {
            return val[key] == x[key];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arrCrypto2.forEach((k) => {
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
          arrCrypto2.push(a);
        }
        arrCrypto2 = _.sortBy(arrCrypto2, "occurrence").reverse();

        return arrCrypto2;
      });
    }
    let key = "ticker";
    findOcc(response, key);
    barCharArrayCrypto = arrCrypto2.slice(0, 5);
    //lets do some math with the top 5 mentioned stocks. we want the total number of mentions for the top 5, then we canculate the percentage of mentions of the total for each stock. This will determine how we will render the bars chart.
    console.log(barCharArrayCrypto);
    //helper function for percentage
    const calculatePercentage = (x, y) => {
      return Math.round((x / y) * 100);
    };

    let totalTop5 = barCharArrayCrypto
      .map((item) => item.occurrence)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(totalTop5);
    crypto1 = barCharArrayCrypto[0].ticker;
    crypto1Percentage = calculatePercentage(
      barCharArrayCrypto[0].occurrence,
      totalTop5
    );
    crypto2 = barCharArrayCrypto[1].ticker;
    crypto2Percentage = calculatePercentage(
      barCharArrayCrypto[1].occurrence,
      totalTop5
    );
    crypto3 = barCharArrayCrypto[2].ticker;
    crypto3Percentage = calculatePercentage(
      barCharArrayCrypto[2].occurrence,
      totalTop5
    );
    crypto4 = barCharArrayCrypto[3].ticker;
    crypto4Percentage = calculatePercentage(
      barCharArrayCrypto[3].occurrence,
      totalTop5
    );
    crypto5 = barCharArrayCrypto[4].ticker;
    crypto5Percentage = calculatePercentage(
      barCharArrayCrypto[4].occurrence,
      totalTop5
    );

    arrCrypto2 = arrCrypto2; //do this because dummy svelte wants a re-render.
  });
</script>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
  </style>
</svelte:head>

<main>
  <div class="container">
    <Intro />
    <br />
    <h1>Data Analysis</h1>
    <br />
    <h3>All time ticker mention percentage (stocks):</h3>

    <StockGraph
      s1Percentage={stock1Percentage}
      s2Percentage={stock2Percentage}
      s3Percentage={stock3Percentage}
      s4Percentage={stock4Percentage}
      s5Percentage={stock5Percentage}
      s1={stock1}
      s2={stock2}
      s3={stock3}
      s4={stock4}
      s5={stock5}
    />

    <h3>Top 10 mentions (stocks):</h3>

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
    <br />
    <h3>All time symbol mention percentage (crypto):</h3>

    <StockGraph
      s1Percentage={crypto1Percentage}
      s2Percentage={crypto2Percentage}
      s3Percentage={crypto3Percentage}
      s4Percentage={crypto4Percentage}
      s5Percentage={crypto5Percentage}
      s1={crypto1}
      s2={crypto2}
      s3={crypto3}
      s4={crypto4}
      s5={crypto5}
    />

    <h3>Top 5 mentions (crypto):</h3>

    <table id="customers">
      <th>Ticker </th>
      <th>All Time Mentions </th>
      {#each barCharArrayCrypto as { ticker, occurrence }}
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
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
  }
  td {
    height: 10px;
  }

  a {
    color: #ff3e00;
    transform: underline;
  }

  h1 {
    color: #ff3e00;
    font-family: "Montserrat", sans-serif;
  }

  table {
    border-collapse: collapse;
  }

  tr:nth-child(n + 13) {
    display: none;
  }

  .container {
    margin: auto;
    width: 70%;
    padding: 40px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

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
