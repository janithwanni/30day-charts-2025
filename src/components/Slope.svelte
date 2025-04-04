<script>
import * as d3 from "d3"
import {regressionLinear} from "d3-regression"
import {onMount} from "svelte"; 

let {data} = $props();

const width = 640;
const height = 640;
const margin = {top: 10, left: 10, right:10, bottom: 10}

const xVals = data.map(d => d.x)
const yVals = data.map(d => d.y)

let xMax = $state(d3.max(xVals))
let yMax = $state(d3.max(yVals))

let xDomain = $derived([0, xMax])
let yDomain = $derived([0, yMax])

let xLabel = "Attack"
let yLabel = "Defense"

const xScale = $derived(
  d3.scaleLinear()
  .domain(xDomain)
  .range([margin.left, width - margin.right])
)

const yScale = $derived(
  d3.scaleLinear()
  .domain(yDomain) 
  .range([height - margin.bottom, margin.top])
)

onMount(() => {
  let entireWidth = width + margin.left + margin.right
  let entireHeight = height + margin.top + margin.bottom
  let svg = d3.select("#chart")
    .attr("viewBox", [-margin.left, 0, entireWidth, entireHeight])
    .attr("width", entireWidth)
    .attr("height", entireHeight)

  svg.append("g")
    .attr("id", "xscale")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
  svg.append("g")
    .attr("id", "yscale")
    .attr("transform", `translate(${margin.left}, 0)`)
  svg.append("g").attr("id", "scatters")
  svg.append("g")
    .attr("id", "regline")
    .append("line")
    .datum(regressionLinear().x(d => d.y).y(d => d.y)(data))
        .attr("x1", d => xScale(d[0][0]))
        .attr("x2", d => xScale(d[1][0]))
        .attr("y1", d => yScale(d[0][1]))
        .attr("y2", d => yScale(d[1][1]))
        .attr("style", "stroke: black")

  let reglineGen = regressionLinear()
      .x(d => d.x)
      .y(d => d.y)

  $effect(() => {
      svg.select("#xscale")
        .call(d3.axisBottom(xScale))

      svg.select("#yscale")
        .call(d3.axisLeft(yScale))


      svg.select("#scatters").selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 5)
        .attr("stroke", "#FFDE00")
        .attr("fill", "#3B4CCA")
        .attr("stroke-width", "1px")
      

      var filteredData = data.filter(d => d.y < yMax && d.x < xMax) 
      svg.select("#regline")
        .select("line")
        .datum(
          reglineGen.domain([d3.min(xVals), xMax])(filteredData)
        )
        .attr("x1", d => xScale(d[0][0]))
        .attr("x2", d => xScale(d[1][0]))
        .attr("y1", d => yScale(d[0][1]))
        .attr("y2", d => yScale(d[1][1]))
        .attr("style", "stroke: black")
    })

  })

</script>

<div>
  <svg id="chart">
  </svg>
</div>
<div>
<div> 
  <label for="xSlider">Slide {xLabel}</label>
  <input type="range" id = "xSlider" name = "xSlider" bind:value={xMax} min={d3.min(xVals)} max={d3.max(xVals)} />
</div>
<div>
  <label for="ySlider">Slide {yLabel}</label>
  <input type="range" id="ySlider" name="ySlider" bind:value={yMax} min={d3.min(yVals)} max={d3.max(yVals)} />
</div>
</div>
