<script>
import Waffle from "$comp/Waffle.svelte" 
let {data} = $props();
</script>

<div class="py-4 flex flex-col justify-center items-center">
<div class="text-4xl pb-2 font-bold">Day 1: Fractions</div>
<div>What are the most common Pokemon types and how do their proportions differ through the generations?</div>
<br/>
<div class="text-xl font-bold italic">It's getting a lot drier folks with lesser water type Pokemon joining in</div>
</div>
<Waffle data={data.data} />


