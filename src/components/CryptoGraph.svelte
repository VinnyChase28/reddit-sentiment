<script>
  export const cryptograph = "all";
  export let s1Percentage;
  export let s2Percentage;
  export let s3Percentage;
  export let s4Percentage;
  export let s5Percentage;
  export let s1;
  export let s2;
  export let s3;
  export let s4;
  export let s5;
</script>

<table class="graph">
  <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Percent</th>
    </tr>
  </thead>

  <tbody>
    <tr style="height:{s1Percentage}%">
      <th scope="row">{s1}</th>
      <td><span>{s1Percentage + "%"}</span></td>
    </tr>
    <tr style="height:{s2Percentage}%">
      <th scope="row">{s2}</th>
      <td><span>{s2Percentage + "%"}</span></td>
    </tr>
    <tr style="height:{s3Percentage}%">
      <th scope="row">{s3}</th>
      <td><span>{s3Percentage + "%"}</span></td>
    </tr>
    <tr style="height:{s4Percentage}%">
      <th scope="row">{s4}</th>
      <td><span>{s4Percentage + "%"}</span></td>
    </tr>
    <tr style="height:{s5Percentage}%">
      <th scope="row">{s5}</th>
      <td><span>{s5Percentage + "%"}</span></td>
    </tr>
  </tbody>
</table>

<style>
  /* barchart */

  .graph {
    margin-bottom: 0em;
    margin-top: 100px;
    display: flex;
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
</style>
