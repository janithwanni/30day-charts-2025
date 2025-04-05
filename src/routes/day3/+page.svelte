<script>
import * as d3 from "d3"
import CirclePack from "$comp/CirclePack.svelte"
let {data} = $props();
</script>


<div class="flex flex-col justify-center items-center p-8">
  <div class = "flex flex-col justify-center items-center">
    <div class = "text-4xl font-playfair font-bold py-2">Day 3: Circle</div>
    <div class="font-winky py-4 text-xl"> The entirety of Bob Ross's color palette on circles based on how much the colors were used in each season.</div>
  </div>
  <CirclePack data={data.data} hierarchyData={data.hierarchyData} />
</div>
