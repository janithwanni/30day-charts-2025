import csvStr from "$data/bob_ross.csv?raw"
import * as d3 from "d3";

function cleanStr(s) {
  const c = s
    .replace("[", "")
    .replace("]", "")
    .replaceAll("'", "")
    .replaceAll("\\r\\n", "")
    .split(", ")
  return c
}

export function load({ params }) {
  const data = d3.csvParse(csvStr, (d) => {
      return {
        id: +d.painting_index,
        season: +d.season,
        episode: +d.episode,
        colors: cleanStr(d.colors),
        color_codes: cleanStr(d.color_hex), 
        num_colors: +d.num_colors 
      }
    })

  // const pathStr = data.reduce((acc,cur) => {
  //   return acc.concat(...cur.colors.map(c => { return {id: `${cur.season}.${cur.episode}.${c}`}}))
  // }, [])

  const hierarchyData = {
    name: "bob",
    children: [... new Set(data.map(d => d.season))]
      .map(s => {
        const colorMap = new Map();
        data
          .filter(x => x.season == s)
          .forEach(e => {
              e.colors.forEach((name, i) => {
                const val = e.color_codes[i]
                const key = `${name}||${val}`
                if (colorMap.has(key)) {
                  colorMap.get(key).count += 1;
                } else {
                  colorMap.set(key, {name: name, colorCode: val, count: 1})
                }
              })
          })
        const colorSummary = Array.from(colorMap.values())
        return {
          name: s,
          children: colorSummary             
        }
      })
  }

  return {
    data: data,
    hierarchyData: hierarchyData
  }
}
