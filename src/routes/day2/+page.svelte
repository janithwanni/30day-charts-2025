<script>
  import Slope from "$comp/Slope.svelte";
  let {data} = $props();
</script>

<div class="flex flex-col justify-center items-center p-8">
  <div class = "flex flex-col justify-center items-center">
    <div class = "text-4xl font-playfair font-bold">Day 2: Slope</div>
    <div> Let's take a look at the relationship between the <span class="italic">Attack (x-axis)</span> and the <span class="italic">Defense (y-axis)</span> of Pokemon. <br/> <span>But there's a catch try changing the sliders below to see how the trend looks different</span></div>
    <Slope data={data.data} />
  </div>
</div>
