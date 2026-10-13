// // CHART 8: Australia's Online Shopping Hotspots
// const chart8 = {
//     "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
//     "width": 650,
//     "height": 500,
//     "params": [
//         {
//             "name": "HotspotCategory",
//             "value": "Highest volume",
//             "bind": {
//                 "input": "select",
//                 "options": [
//                     "Highest volume",
//                     "Highest per capita",
//                     "Fastest growth"
//                 ],
//                 "labels": [
//                     "Highest shopping volume",
//                     "Highest volume per capita",
//                     "Fastest growth"
//                 ],
//                 "name": "Show: "
//             }
//         },
//         {
//             "name": "zoom_level",
//             "value": 650,
//             "bind": {
//                 "input": "range",
//                 "min": 400,
//                 "max": 4000,
//                 "step": 50,
//                 "name": "Zoom: "
//             }
//         },
//         {
//             "name": "center_to",
//             "value": [134, -25],
//             "bind": {
//                 "input": "select",
//                 "options": [
//                     [134, -25],
//                     [151.21, -33.87],
//                     [144.96, -37.81],
//                     [153.03, -27.47],
//                     [115.86, -31.95],
//                     [138.60, -34.93]
//                 ],
//                 "labels": [
//                     "Australia",
//                     "Sydney",
//                     "Melbourne",
//                     "Brisbane",
//                     "Perth",
//                     "Adelaide"
//                 ],
//                 "name": "Map Centre: "
//             }
//         }
//     ],

//     "projection": {
//         "type": "mercator",
//         "center": {"expr": "center_to"},
//         "scale": {"expr": "zoom_level"}
//     },
//     "layer": [
//         // Australia base map
//         {
//             "data": {
//                 "url": "js/states.geojson",
//                 "format": {
//                     "type": "json",
//                     "property": "features"
//                 }
//             },

//             "mark": {
//                 "type": "geoshape",
//                 "fill": "#E2E8E8",
//                 "stroke": "#FFFFFF",
//                 "strokeWidth": 1.5
//             }
//         },
//         // Hotspot circles
//         {
//             "data": {
//                 "url": "data/online_shopping_hotspots.csv",
//                 "format": {
//                     "type": "csv",
//                     "parse": {
//                         "Rank": "number",
//                         "Longitude": "number",
//                         "Latitude": "number"
//                     }
//                 }
//             },
//             "transform": [
//                 {
//                     "filter": "datum.Category === HotspotCategory"
//                 }
//             ],
//             "mark": {
//                 "type": "circle",
//                 "color": "#527298",
//                 "stroke": "white",
//                 "strokeWidth": 2
//             },
//             "encoding": {
//                 "longitude": {
//                     "field": "Longitude",
//                     "type": "quantitative"
//                 },
//                 "latitude": {
//                     "field": "Latitude",
//                     "type": "quantitative"
//                 },
//                 "size": {
//                     "field": "Rank",
//                     "type": "ordinal",
//                     "scale": {
//                         "domain": [1, 2, 3],
//                         "range": [1700, 900, 250]
//                     },
//                     "legend": null
//                 },
//                 "tooltip": [
//                     {
//                         "field": "Rank",
//                         "type": "quantitative",
//                         "title": "Rank"
//                     },
//                     {
//                         "field": "Location",
//                         "type": "nominal",
//                         "title": "Location"
//                     },
//                     {
//                         "field": "Postcode",
//                         "type": "nominal",
//                         "title": "Postcode"
//                     },
//                     {
//                         "field": "State",
//                         "type": "nominal",
//                         "title": "State"
//                     },
//                     {
//                         "field": "Category",
//                         "type": "nominal",
//                         "title": "Category"
//                     }
//                 ]
//             }
//         },
//         // Rank numbers
//         {
//             "data": {
//                 "url": "data/online_shopping_hotspots.csv",
//                 "format": {
//                     "type": "csv",
//                     "parse": {
//                         "Rank": "number",
//                         "Longitude": "number",
//                         "Latitude": "number"
//                     }
//                 }
//             },
//             "transform": [
//                 {
//                     "filter": "datum.Category === HotspotCategory"
//                 }
//             ],
//             "mark": {
//                 "type": "text",
//                 "fontSize": 13,
//                 "fontWeight": "bold",
//                 "color": "white"
//             },
//             "encoding": {
//                 "longitude": {
//                     "field": "Longitude",
//                     "type": "quantitative"
//                 },
//                 "latitude": {
//                     "field": "Latitude",
//                     "type": "quantitative"
//                 },
//                 "text": {
//                     "field": "Rank"
//                 }
//             }
//         },
//         // Normal location labels
//         // Exclude Sydney and Alexandria because they need special positioning
//         {
//             "data": {
//                 "url": "data/online_shopping_hotspots.csv",
//                 "format": {
//                     "type": "csv",
//                     "parse": {
//                         "Rank": "number",
//                         "Longitude": "number",
//                         "Latitude": "number"
//                     }
//                 }
//             },
//             "transform": [
//                 {
//                     "filter": "datum.Category === HotspotCategory"
//                 },
//                 {
//                     "filter":
//                         "datum.Location !== 'Sydney' && datum.Location !== 'Alexandria'"
//                 }
//             ],
//             "mark": {
//                 "type": "text",
//                 "dx": 24,
//                 "align": "left",
//                 "baseline": "middle",
//                 "fontSize": 12,
//                 "fontWeight": "bold",
//                 "color": "#333333"
//             },
//             "encoding": {
//                 "longitude": {
//                     "field": "Longitude",
//                     "type": "quantitative"
//                 },

//                 "latitude": {
//                     "field": "Latitude",
//                     "type": "quantitative"
//                 },

//                 "text": {
//                     "field": "Location"
//                 }
//             }
//         },
//         // Sydney label
//         // Put above the Sydney point
//         {
//             "data": {
//                 "url": "data/online_shopping_hotspots.csv",
//                 "format": {
//                     "type": "csv",
//                     "parse": {
//                         "Longitude": "number",
//                         "Latitude": "number"
//                     }
//                 }
//             },
//             "transform": [
//                 {
//                     "filter":
//                         "datum.Category === HotspotCategory && datum.Location === 'Sydney'"
//                 }
//             ],
//             "mark": {
//                 "type": "text",
//                 "dx": 28,
//                 "dy": -25,
//                 "align": "left",
//                 "baseline": "middle",
//                 "fontSize": 12,
//                 "fontWeight": "bold",
//                 "color": "#333333"
//             },
//             "encoding": {
//                 "longitude": {
//                     "field": "Longitude",
//                     "type": "quantitative"
//                 },
//                 "latitude": {
//                     "field": "Latitude",
//                     "type": "quantitative"
//                 },
//                 "text": {
//                     "field": "Location"
//                 }
//             }
//         },
//         // Alexandria label
//         // Put below the Alexandria point
//         {
//             "data": {
//                 "url": "data/online_shopping_hotspots.csv",
//                 "format": {
//                     "type": "csv",
//                     "parse": {
//                         "Longitude": "number",
//                         "Latitude": "number"
//                     }
//                 }
//             },
//             "transform": [
//                 {
//                     "filter":
//                         "datum.Category === HotspotCategory && datum.Location === 'Alexandria'"
//                 }
//             ],
//             "mark": {
//                 "type": "text",
//                 "dx": 28,
//                 "dy": 25,
//                 "align": "left",
//                 "baseline": "middle",
//                 "fontSize": 12,
//                 "fontWeight": "bold",
//                 "color": "#333333"
//             },
//             "encoding": {
//                 "longitude": {
//                     "field": "Longitude",
//                     "type": "quantitative"
//                 },
//                 "latitude": {
//                     "field": "Latitude",
//                     "type": "quantitative"
//                 },
//                 "text": {
//                     "field": "Location"
//                 }
//             }
//         }
//     ],
//     "config": {

//         "background": "#F3FAF9",

//         "view": {
//             "stroke": null
//         },
//         "legend": {
//             "labelFontSize": 12,
//             "titleFontSize": 13
//         }
//     }
// };