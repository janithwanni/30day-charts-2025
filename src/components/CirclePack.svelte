<script>
  import {onMount} from "svelte";
  import * as d3 from "d3";
  let {data, hierarchyData} = $props();
  let chartElement;
  const width = 640;
  const height = 640;
  const pack = pdata => d3.pack()
    .size([width, height])
    .padding(3)
    (d3.hierarchy(pdata).sum(d => d.count).sort((a,b) => b.value - a.value))
  const root = pack(hierarchyData)
  // console.log(root)
  onMount(() => {
    window.d3 = d3;
    window.pdata = hierarchyData;
    // console.log(root.descendants().slice(1))
    const node = d3.select(chartElement).append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("fill", d => {
        // console.log(d); 
        return d.height == 0 ? d.data.colorCode : d.parent ? "#aaaaaaff" : "#d9d9d988"}
      )
      // .attr("stroke", "black")
      .attr("stroke-width",d => d.children ? "1": "0.1px")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      // .attr("pointer-events", d => !d.children ? "none" : null)
      // .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      // .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      // .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    const label = d3.select(chartElement).append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.height == 0 ? "inline" : "none")
        .text(d => d.data.name)
        .attr("x", d => d.x).attr("y", d => d.y)

  })
</script>

<svg bind:this={chartElement} viewBox={`0 0 ${width} ${height}`} {width} {height} class="max-w-full h-auto block"></svg>
