<script>
  import { slice } from "lodash";

  export let array = [];
  export let tableRowCount = 10;
</script>

<table id="customers">
  <th>Ticker </th>
  <th>All Time Mentions </th>
  {#each array.slice(0, 10) as { ticker, occurrence }}
    <tr>
      <td class="sent bar">{ticker}</td>
      <td>{occurrence}</td>
    </tr>
  {/each}
</table>

<style>
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    max-height: 300px;
    max-width: 300px;
    box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px #2e3440,
      0.3em 0.3em 1em #d8dee9;
    margin-bottom: 30px;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: black;
  }

  #customers tr:hover {
    background-color: #d8dee9;
    color: #2e3440;
    font-weight: bold;
  }

  #customers th {
    text-align: left;
    background-color: #4c566a;
    color: white;
  }

  table {
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
