<script>
  import { onMount } from "svelte";
  import Chart from "svelte-frappe-charts";
  import StockGraph from "./StockGraph.svelte";
  import VerticalTable from "./Crypto/VerticalTable.svelte";
  import { supabase } from "../supabaseClient";
  import _ from "lodash";

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

  let days = 0;
  const getDate = () => {
    let today = new Date();
    let startDate = today.setDate(today.getDate() - days);
    let isoDate = new Date(startDate).toISOString();
    return isoDate;
  };

  const getStocks = async () => {
    arr2 = [];
    const { data, error } = await supabase
      .from("ticker_mentions")
      .select(
        `
    ticker,
    comment,
    created_at
  `
      )
      .gt("created_at", getDate());
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
    console.log(arr2);
  };

  //get crypto data
  const getCrypto = async (days) => {
    arrCrypto2 = [];
    const { data, error } = await supabase
      .from("crypto_mentions")
      .select(
        `
    ticker,
    comment,
    created_at
  `
      )
      .gt("created_at", getDate());
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
    console.log(arrCrypto2);
  };
</script>

<div class="container">
  <p>Fetch {days} days worth of data:</p>
  <input type="text" bind:value={days} />
  <button
    class="button"
    on:click={() => {
      if (days >= 0 && days <= 30) {
        getStocks();
        getCrypto();
      } else {
        alert(
          "Greater than 0, Less than 40 Please. I'm using a free account >:("
        );
      }
    }}>Get Data</button
  >
</div>

<div id="mySidenav" class="sidenav">
  <ul>
    <li>
      <a href="/" on:click|preventDefault={() => (menu = 1)}>Tables</a>
    </li>
    <li><a href="/" on:click|preventDefault={() => (menu = 2)}>Charts</a></li>
    <li>
      <a href="/" on:click|preventDefault={() => (menu = 3)}>Stories</a>
    </li>
  </ul>
</div>
<div class="container">
  {#if menu === 1}
    {#if arr2.length > 0 && arrCrypto2.length > 0}
      <p>Top 10 Most mentioned stocks in last {days} days</p>
      <VerticalTable array={arr2} />
      <p>Top 10 Most mentioned crypto in last {days} days</p>
      <VerticalTable array={arrCrypto2} />
    {:else}<p>Waiting to populate tables...</p>{/if}
  {:else if menu === 2}
    {#if barCharArray.length > 0 && barCharArrayCrypto.length > 0}
      <p>Top 5 Most mentioned stocks % in last {days} days</p>
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
      <p>Top 5 Most mentioned crypto % in last {days} days</p>
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
    {:else}<p>Waiting to populate charts...</p>
    {/if}
  {:else if menu === 3}
    {#if arr2.length > 0 && arrCrypto2.length > 0}
      <VerticalTable array={arr2} />
      <VerticalTable array={arrCrypto2} />
    {:else}<p>Waiting to populate stories...</p>{/if}
  {:else}
    <h1>Page Not Found</h1>
  {/if}
</div>

<style>
  button {
    transition: all 0.5s ease;
    color: #d8dee9;
    border: 3px solid #d8dee9;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
    font-size: 17px;
    background-color: transparent;
    padding: 10px;
    outline: none;
    border-radius: 4px;
    margin-top: 20px;
  }

  button:hover {
    color: #001f3f;
    background-color: #d8dee9;
  }
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    max-width: 600px;
  }

  .container input {
    max-width: 80px;
  }

  .sidenav ul {
    margin-top: 100px;
    list-style-type: none;
    width: 200px;
    background-color: transparent;
    position: fixed;
    height: 100%;
    align-items: center;
  }

  .sidenav li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    color: #81a1c1;
    font-family: "Merriweather", sans-serif;
  }

  .sidenav li a.active {
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

  .container input {
    max-width: 300px;
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
