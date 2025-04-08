import csvStr from "$data/bob_ross.csv?raw"
import * as d3 from "d3";

export function load({ params }) {
  const data = d3.csvParse(csvStr, (d) => {
      return {
        id: +d.painting_index,
      }
    })

  return {
    data: data,
  }
}
