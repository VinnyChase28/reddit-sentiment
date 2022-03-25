<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient";
  import _ from "lodash";
  let arr2 = [];
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
    arr2 = arr2; //do this because dummy svelte wants a re-render.
  });
  const drawBarChart = (finalData, options, element) => {};
  // do something with our fetched data
</script>

<main>
  <table>
    <th>Stock</th>
    <th>Mentions since March 22, 2022 </th>
    {#each arr2 as { ticker, occurrence }}
      <tr>
        <td>{ticker}</td>
        <td>{occurrence}</td>
      </tr>
    {/each}
  </table>
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

  table {
    width: 50%;
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
