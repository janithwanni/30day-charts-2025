<script>
  import * as d3 from "d3";
  import {onMount} from "svelte";
  
  let {data, nodes} = $props();
  let canvasElem;
  const width = 512;
  const height = 512;
  const rScale = d3.scaleLinear()
    .domain(d3.extent(nodes.map(n => n.value)))
    .range([10,20])

  const colScale = d3.scaleOrdinal(d3.schemeObservable10)
    .domain([...new Set(nodes.map(n => n.type))])
  console.log([...new Set(nodes.map(n => n.type))])
  console.log([...new Set(nodes.map(n => n.type))].map(c => colScale(c)))
  const pack = (data) => d3.pack()
    .size([width, height])
    .padding(1)
    (d3.hierarchy({children: data}).sum(d => d.value))
  const packData = pack(nodes)
  const packLeaves = packData.leaves()
  console.log("nodes", nodes)
  console.log("packData", packData)
  console.log("packLeaves", packLeaves)

  // TODO: Is this to get cluster centers
  // Yep it seems so based on the usage in forceCluster
  const centroid = function(nodes) {
    let x = 0;
    let y = 0;
    let z = 0;
    for (const d of nodes) {
      // console.log(d)
      let k = d.r ** 2;
      x += d.x * k;
      y += d.y * k;
      z += k;
    }
    return {x: x / z, y: y / z};
  }
  console.log("rollup", d3.rollup(packData.leaves(), centroid, d => d.data.type))

  const forceCluster = function () {
    const strength = 0.2;
    let nodes;

    function force(alpha) {
      const centroids = d3.rollup(nodes, centroid, d => d.data.type);
      const l = alpha * strength;
      for (const d of nodes) {
        const {x: cx, y: cy} = centroids.get(d.data.type);
        d.vx -= (d.x - cx) * l;
        d.vy -= (d.y - cy) * l;
      }
    }

    force.initialize = _ => nodes = _;

    return force;
  }

  function forceCollide() {
    const alpha = 0.3; // fixed for greater rigidity!
    const padding1 = 2; // separation between same-color nodes
    const padding2 = 6; // separation between different-color nodes
    let nodes;
    let maxRadius;

    function force() {
      const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
      for (const d of nodes) {
        const r = d.r + maxRadius;
        const nx1 = d.x - r, ny1 = d.y - r;
        const nx2 = d.x + r, ny2 = d.y + r;
        quadtree.visit((q, x1, y1, x2, y2) => {
          if (!q.length) do {
            if (q.data !== d) {
              const r = d.r + q.data.r + (d.data.type === q.data.data.type ? padding1 : padding2);
              let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
              if (l < r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l, d.y -= y *= l;
                q.data.x += x, q.data.y += y;
              }
            }
          } while (q = q.next);
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      }
    }

    force.initialize = _ => maxRadius = d3.max(nodes = _, d => d.r) + Math.max(padding1, padding2);

    return force;
  }

const forceBoundary = function([x0, y0, x1, y1]) {
  let nodes;
  let radiusAccessor = d => d.r || 0;
  let strength = 1;

  function force() {
    for (const d of nodes) {
      const r = radiusAccessor(d);
      if (d.x - r < x0) d.vx += (x0 - (d.x - r)) * strength;
      if (d.x + r > x1) d.vx += (x1 - (d.x + r)) * strength;
      if (d.y - r < y0) d.vy += (y0 - (d.y - r)) * strength;
      if (d.y + r > y1) d.vy += (y1 - (d.y + r)) * strength;
    }
  }

  force.initialize = function(_nodes) {
    nodes = _nodes;
  };

  force.radius = function(_r) {
    return arguments.length ? (radiusAccessor = _r, force) : radiusAccessor;
  };

  force.strength = function(_s) {
    return arguments.length ? (strength = _s, force) : strength;
  };

  force.bounds = function(bounds) {
    return arguments.length ? ([x0, y0, x1, y1] = bounds, force) : [x0, y0, x1, y1];
  };


return force;
}

  const simulation = d3.forceSimulation(packData.leaves())
    .force("x", d3.forceX(width / 2).strength(0.01))
    .force("y", d3.forceY(height / 2).strength(0.01))
    // .force("charge", d3.forceManyBody().strength(-10)) TODO: We will have to remove this as we write our own clustering force
    .force("center", d3.forceCenter(width / 4, height / 4).strength(0.01))
    // .force("collide", d3.forceCollide().radius(d => d.r + 0.5).iterations(2))
    .force("collide", forceCollide())
    .force("cluster",forceCluster())
    .force("boundary", forceBoundary([0,0,width, height]))

  const draw = function(ctx, opts) {
    ctx.clearRect(0, 0, opts.width, opts.height)
    ctx.save()

    for (const d of opts.nodes) {
      ctx.beginPath();

      ctx.moveTo(d.x + d.r, d.y)
      ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
      ctx.fillStyle = opts.colScale(d.data.type);
      ctx.fill()
      ctx.strokeStyle = "#00000055"
      ctx.stroke()
      }
      ctx.restore()
    }
  const opts = {
      width: width, height: height, nodes: packLeaves,
      rScale: rScale, colScale: colScale
    }
  console.log(opts.colScale("plastic"))
  onMount(() => {
    window.d3 = d3;
    window.nodes = nodes;
    window.packLeaves = packLeaves;
    window.data = data;
    const dpi = devicePixelRatio
    const ctx = canvasElem.getContext('2d')
    d3.select(canvasElem).attr("width", width * dpi).attr("height", height * dpi)
    ctx.scale(dpi, dpi)
    simulation.on("tick", () => draw(ctx, opts))
    })
  
</script>

<div>
<canvas bind:this={canvasElem} width={width} height={height} style={`width: ${width}px; max-width: 100%; height: auto;`}> </canvas>
</div>
