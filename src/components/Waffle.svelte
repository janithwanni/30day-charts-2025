<script>
  let {data} = $props();
  let gens = [... new Set(data.map(x => x.gen))]
  let ncols = 5;
  let targetType = "water";
  const cellDim = 3;
  const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  let colorKeys = Object.keys(colours)
  const colorCounts = {}
  colorKeys.forEach(c => {
    colorCounts[c] =  data.filter(x => x.primary === c).length
  });

  const getType = function(g, ind) {
    const gen_arr = data.filter(x => x.gen === g);
    const sort_gen_arr = sort_gen(gen_arr)
    return sort_gen_arr[ind]["primary"]
    }

  const sort_gen = function(arr) {
    return arr.sort((a,b) => {
      return colorCounts[a.primary] < colorCounts[b.primary] ? 1:-1
      })
  }
  let sortedColorKeys = colorKeys.sort((a,b) => {
      return colorCounts[a] < colorCounts[b] ? 1:-1
    })
  console.log(colorKeys, sortedColorKeys)
  const colorCell = function(g, ind) {
    return colours[getType(g, ind)]
  }

  const getName = function(g, ind) {
    const gen_arr = data.filter(x => x.gen === g);
    const sort_gen_arr = sort_gen(gen_arr)
    return sort_gen_arr[ind]["pokemon"]
    }
let tooltip;
  const mouseEnter = function(e) {
    console.log(e)
     tooltip.style.top = `${e.clientY}px` 
     tooltip.style.left = `${e.clientX}px` 
     tooltip.innerHTML = e.target.getAttribute("data-tippy-content")
     tooltip.classList.remove("opacity-0")
     tooltip.classList.add("opacity-100")
    }
    const mouseExit = function(e) {
        tooltip.classList.add("opacity-0")
        tooltip.classList.remove("opacity-100")
      }
</script>

<div bind:this={tooltip} class="opacity-0 absolute p-1 rounded-md bg-black text-white" id="tooltip"></div>
<div class="flex justify-center items-center">
<div class="grid grid-cols-6">
{#each sortedColorKeys as color}
{@debug color}
<div class="flex flex-row px-2">
 <div class = "w-4 h-4 mt-1" style="background-color: {colours[color]}"></div><div class="pl-2">{color}</div> 
 </div>
{/each}
</div>
</div>
<div class="flex justify-center items-center pt-12">
<div class = "grid w-fit gap-4 grid-rows-1" style="grid-template-columns: repeat({gens.length}, 1fr);">
{#each gens as g}
  {@const ncol_arr = Array(ncols).fill(0).map((d,i) => i)}
  {@const gen_arr = data.filter(x => x.gen === g)}
  {@const sort_gen_arr = sort_gen(gen_arr)}
  {@const nrows = Math.ceil(sort_gen_arr.length / ncols)}
  {@const nrow_arr = Array(nrows).fill(0).map((d,i) => i)}
  <!-- {@debug nrows} -->
  <!-- {@debug ncols} -->
  <div>
  <div class="pb-4 flex justify-center items-center"><div>
    Gen {g}
  </div></div>
  <div class="grid gap-1" style = "grid-template-columns: repeat({ncols}, 1fr); grid-template-rows: repeat({nrows}, calc(var(--spacing) * {cellDim}));">
    {#each nrow_arr as nr}
    {#each ncol_arr as nc}
    {@const curIndex = nr*ncols + nc}
    <!-- {@debug curIndex} -->
    {#if curIndex < sort_gen_arr.length}
      <div onmouseenter={mouseEnter} onmouseleave={mouseExit} class="cell" data-tippy-content="{getName(g, curIndex)}" style="background-color: {colorCell(g,curIndex)}; height: calc(var(--spacing) * {cellDim}); width: calc(var(--spacing) * {cellDim})"></div>
    {/if}
    {/each}
    {/each}
  </div>
  </div>
{/each}
</div>
</div>
