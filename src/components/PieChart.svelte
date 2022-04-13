<script>
  import { Page, Navbar, BlockTitle, Block, PieChart } from "framework7-svelte";
  export const piechart = "all";
</script>

<BlockTitle>With Tooltip</BlockTitle>
<Block strong>
  <!-- prettier-ignore -->
  <PieChart
    tooltip
    datasets={[
      {
        label: 'JavaScript',
        value: 150,
        color: '#ff0',
      },
      {
        label: 'Vue.js',
        value: 150,
        color: '#0f0',
      },
      {
        label: 'TypeScript',
        value: 400,
        color: '#00f',
      },
    ]}
  />
</Block>
