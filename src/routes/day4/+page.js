import csvStr from "$data/trashwheel.csv?raw"
import * as d3 from "d3";

export function load({ params }) {
  const data = d3.csvParse(csvStr, (d) => {
    if (d.Year !== "2022") {
      return undefined
    }
      return {
        id: +d.ID,
        date: d.Date,
        name: d.Name,
        weight: +d.Weight,
        volume: +d.Volume,  
        plastic: +d.PlasticBottles,
        // polysty: +d.Polystyrene,
        // cigars: +d.CigaretteButts,
        glass: +d.GlassBottles,
        // bags: +d.PlasticBags,
        // wrappers: +d.Wrappers,
        // balls: +d.SportsBalls
      }
    })

  const nodes = data.reduce((acc,curr) => {
    return acc.concat([
      {date: curr.date, type: "plastic", value: curr.plastic},
      // {date: curr.date, type: "polysty", value: curr.polysty},
      // {date: curr.date, type: "cigars", value: curr.cigars},
      {date: curr.date, type: "glass", value: curr.glass},
      // {date: curr.date, type: "bags", value: curr.bags},
      // {date: curr.date, type: "wrappers", value: curr.wrappers},
      // {date: curr.date, type: "balls", value: curr.balls},
    ])
  }, [])
  console.log("pagejs", nodes)

  return {
    data: data,
    nodes: nodes
  }
}
