<script>
  import { onMount } from "svelte";
  import Chart from "svelte-frappe-charts";
  import StockGraph from "./StockGraph.svelte";
  import VerticalTable from "./Crypto/VerticalTable.svelte";
  import { supabase } from "../supabaseClient";
  import _ from "lodash";
  import { query } from "./Store";
  export let menu = 1;

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

  let data1 = {
    labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9],
      },
    ],
  };

  onMount(async () => {
    const { data, error } = await supabase
      .from("ticker_mentions")
      .select(
        `
    ticker,
    comment,
    created_at
  `
      )
      .limit(100);
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

    arr2 = arr2; //do this because svelte wants a re-render.
  });

  //get crypto data
  onMount(async () => {
    const { data, error } = await supabase
      .from("crypto_mentions")
      .select(
        `
    ticker,
    comment,
    created_at
  `
      )
      .limit(100);
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

  /* Set the width of the side navigation to 250px */
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
</script>

<div id="mySidenav" class="sidenav">
  <ul>
    <li>
      <a href="/" on:click|preventDefault={() => (menu = 1)}>Tables -></a>
    </li>
    <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Charts</a></li>
    <li>
      <a href="/" on:click|preventDefault={() => (menu = 3)}>Stories</a>
    </li>
  </ul>
</div>
<div class="container">
  <h3>Query</h3>
  <p>Thereddit comment data has been scraped daily since March 22nd, 2022.</p>
  <form class="content">
    <label>Date Ranges</label>
    <input type="text" bind:value={$query.name} />
    <label>Telefone</label>
    <input type="text" bind:value={$query.phone} />
  </form>
  <p>
    {JSON.stringify($query, 0, 2)}
  </p>

  {#if menu === 1}
    <VerticalTable array={arr2} />
    <VerticalTable array={arrCrypto2} />
  {:else if menu === 2}
    <p>
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
    </p>
  {:else if menu === 3}
    <p>Stories</p>
  {:else}
    <h1>Page Not Found</h1>
  {/if}
</div>

<!-- <div id="main">
    <div class="container">chargin
      <br />
      <h3>All time top 5 percentage (stocks):</h3>

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
      <Chart data={data1} type="line" />
      <h3>Top 20 mentions (stocks):</h3>

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

      <h3>All time top 5 percentage (crypto):</h3>

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

      <h3>Top 20 mentions (crypto):</h3>
    </div>
  </div> -->
<style>
  .content {
    display: flex;
    text-align: center;
    flex-direction: column;
  }
  .content input {
    padding: 10px;
  }
  .content label {
    padding: 10px;
  }
  ul {
    margin-top: 100px;
    list-style-type: none;
    width: 200px;
    background-color: transparent;
    position: fixed;
    height: 100%;
    align-items: center;
  }

  li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    color: #81a1c1;
    font-family: "Merriweather", sans-serif;
  }

  li a.active {
    background-color: #04aa6d;
    color: white;
  }

  li a:hover:not(.active) {
    background-color: #555;
    color: #d8dee9;
  }

  .sidenav a:hover {
    color: #d8dee9;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }

  a {
    color: #8fbcbb;
    transform: underline;
  }

  p {
    font-family: "Montserrat", sans-serif;
  }

  h1 {
    color: #81a1c1;
    font-family: "Merriweather", sans-serif;
    padding: 20px;
  }

  h3 {
    font-family: "Merriweather", sans-serif;
    color: #88c0d0;
    padding: 20px;
  }

  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
