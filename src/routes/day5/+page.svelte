<script>
import * as d3 from "d3"
import Ranking from "$comp/Ranking.svelte"
let {data} = $props();
</script>


<div class="flex flex-col justify-center items-center p-8">
  <div class = "flex flex-col justify-center items-center">
    <div class = "text-4xl font-playfair font-bold py-2">Day 5: Ranking</div>
    <div class="font-winky py-4 text-xl"> We are going to look at International Math Olympiad contestant gender disparity data</div>
<!-- We are going to use the IMO dataset and then show the ranks of each individual across years and put a slider to show how many of the top performing contestants are women across the years-->
  </div>
  <Ranking data={data.data} />
</div>
