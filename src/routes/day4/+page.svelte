<script>
import * as d3 from "d3"
import BigSmall from "$comp/BigSmall.svelte"
let {data} = $props();
</script>


<div class="flex flex-col justify-center items-center p-8">
  <div class = "flex flex-col justify-center items-center">
    <div class = "text-4xl font-playfair font-bold py-2">Day 4: Big or Small</div>
    <div class="font-winky py-4 text-xl">
    The <span style="color: #4269d0">circles are plastic bottles </span>that were collected while the <span style="color: #efb118">circles represent the glass bottles </span> that were collected every day with in the year <span class="font-bold">2022</span>
    </div>
    <div class="pb-4 font-winky text-xl font-bold italic">We have too many glass bottles thrown in the Harbor area around the Baltimore Area</div>

<!-- Going to use cluster forces to animate the number of items from different rubbish types -->
  </div>
  <BigSmall data={data.data} nodes={data.nodes} />
</div>
