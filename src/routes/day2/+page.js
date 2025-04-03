import csvStr from "$data/pokemon_df.csv?raw"
import * as d3 from "d3";

export function load({ params }) {
  return {
    data: d3.csvParse(csvStr, (d) => {
      if (d.generation_id === "NA") {
        return undefined;
      }
      return {
        id: +d.id,
        pokemon: d.pokemon,
        primary: d.type_1,
        x: +d.attack,
        y: +d.defense
      }
    })
  }
}
