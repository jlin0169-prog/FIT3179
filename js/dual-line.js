const chart2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "background": null,
  "spacing": 32,

  "data": {
    "url": "data/letters_digital.csv",
    "format": {
      "type": "csv",
      "parse": {
        "Year": "number",
        "LetterFinancialYear": "string",
        "Letters": "number",
        "Messaging": "number"
      }
    }
  },

  // Interactive year slider shared by both panels
  "params": [
    {
      "name": "selectedYear",
      "value": 2023,
      "bind": {
        "input": "range",
        "min": 2019,
        "max": 2025,
        "step": 1,
        "name": "Explore other years: "
      }
    }
  ],

  "vconcat": [

    // Panel A - Pyhsical letter volumes
    {
      "width": 520,
      "height": 170,

      "title": {
        "text": "A. Physical Letter Volumes",
        "subtitle": "Annual change in total letter volumes (%)",
        "anchor": "start",
        "font": "Libre Baskerville",
        "fontSize": 15,
        "fontWeight": 700,
        "subtitleFont": "Figtree",
        "subtitleFontSize": 12,
        "subtitleFontWeight": 400,
        
        "color": "#26384E",
        "subtitleColor": "#65778C"
      },

      "layer": [

        // Main letter-volume line
        {
          "mark": {
            "type": "line",
            "color": "#7297BB",
            "strokeWidth": 3,
            "point": {
              "filled": true,
              "fill": "#7297BB",
              "size": 65
            }
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative",
              "scale": {
                "domain": [2019, 2025],
                "nice": false
              },
              "axis": null
            },

            "y": {
              "field": "Letters",
              "type": "quantitative",
              "scale": {
                "domain": [-15, 0],
                "nice": false
              },
              "axis": {
                "title": "Annual change (%)",
                "grid": true,
                "gridColor": "#E4EAF0",
                "gridWidth": 1,
                "domain": false,
                "ticks": false,
                "labelColor": "#56677B",
                "titleColor": "#26384E"
              }
            },

            "tooltip": [
              {
                "field": "Year",
                "type": "nominal",
                "title": "Financial year"
              },
              {
                "field": "Letters",
                "type": "quantitative",
                "title": "Letter volume change (%)",
                "format": "+.1f"
              },
              {
                "field": "Messaging",
                "type": "quantitative",
                "title": "Messaging app usage (%)",
                "format": ".1f"
              }
            ]
          }
        },

        // Vertical reference line for selected year
        {
          "transform": [
            {
              "filter": "datum.Year === selectedYear"
            }
          ],

          "mark": {
            "type": "rule",
            "color": "#94A3B8",
            "strokeDash": [4, 4],
            "strokeWidth": 1.5
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative"
            }
          }
        },


        // Highlight selected letter data point
        {
          "transform": [
            {
              "filter": "datum.Year === selectedYear"
            }
          ],

          "mark": {
            "type": "point",
            "filled": true,
            "color": "#7297BB",
            "size": 180,
            "stroke": "white",
            "strokeWidth": 2
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative"
            },
            "y": {
              "field": "Letters",
              "type": "quantitative"
            },

            "tooltip": [
              {
                "field": "Year",
                "type": "nominal",
                "title": "Financial year"
              },
              {
                "field": "Letters",
                "type": "quantitative",
                "title": "Letter volume change (%)",
                "format": "+.1f"
              }
            ]
          }
        }

      ]
    },

    // Panel B - Messaging app usage
    {
      "width": 600,
      "height": 170,

      "title": {
        "text": "B. Messaging App Usage",
        "subtitle": "Australian adults using messaging apps (%)",
        "anchor": "start",
        "font": "Libre Baskerville",
        "fontSize": 15,
        "fontWeight": 700,
        "subtitleFont": "Figtree",
        "subtitleFontSize": 12,
        "subtitleFontWeight": 400,
        "color": "#26384E",
        "subtitleColor": "#65778C"
      },

      "layer": [

        // Main messaging-app line
        {
          "mark": {
            "type": "line",
            "color": "#168C86",
            "strokeWidth": 3,
            "point": {
              "filled": true,
              "fill": "#168C86",
              "size": 65
            }
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative",
              "scale": {
                "domain": [2019, 2025],
                "nice": false
              },
              "axis": {
                "title": "Year",
                "format": "d",
                "tickMinStep": 1,
                "labelAngle": 0,
                "grid": false,
                "domain": false,
                "tickColor": "#CBD5E1",
                "labelColor": "#56677B",
                "titleColor": "#26384E"
              }
            },

            "y": {
              "field": "Messaging",
              "type": "quantitative",
              "scale": {
                "domain": [45, 85],
                "nice": false
              },
              "axis": {
                "title": "Adults (%)",
                "grid": true,
                "gridColor": "#E4EAF0",
                "gridWidth": 1,
                "domain": false,
                "ticks": false,
                "labelColor": "#56677B",
                "titleColor": "#26384E"
              }
            },

            "tooltip": [
              {
                "field": "Year",
                "type": "quantitative",
                "title": "Survey year",
                "format": "d"
              },
              {
                "field": "Messaging",
                "type": "quantitative",
                "title": "Messaging app usage (%)",
                "format": ".1f"
              },
              {
                "field": "Letters",
                "type": "quantitative",
                "title": "Letter volume change(%)",
                "format": "+.1f"
              }
            ]
          }
        },

        // Selected-year vertical reference line
        {
          "transform": [
            {
              "filter": "datum.Year === selectedYear"
            }
          ],

          "mark": {
            "type": "rule",
            "color": "#94A3B8",
            "strokeDash": [4, 4],
            "strokeWidth": 1.5
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative"
            }
          }
        },

        // Highlight selected messaging-app point
        {
          "transform": [
            {
              "filter": "datum.Year === selectedYear"
            }
          ],

          "mark": {
            "type": "point",
            "filled": true,
            "color": "#168C86",
            "size": 180,
            "stroke": "white",
            "strokeWidth": 2
          },

          "encoding": {
            "x": {
              "field": "Year",
              "type": "quantitative"
            },
            "y": {
              "field": "Messaging",
              "type": "quantitative"
            },

            "tooltip": [
              {
                "field": "Year",
                "type": "quantitative",
                "title": "Survey year",
                "format": "d"
              },
              {
                "field": "Messaging",
                "type": "quantitative",
                "title": "Messaging app usage (%)",
                "format": ".1f"
              }
            ]
          }
        }
      ]
    }
  ],

  "resolve": {
    "scale": {
      "x": "shared",
      "y": "independent"
    }
  },

  "config": {
    "view": {
      "stroke": null
    },

    "axis": {
      "labelFontSize": 12,
      "titleFontSize": 12,
      "labelColor": "#56677B",
      "titleColor": "#26384E",
      "domain": false,
      "tickColor": "#CBD5E1",
      "gridColor": "#E4EAF0",
      "gridWidth": 1
    }
  }
};
