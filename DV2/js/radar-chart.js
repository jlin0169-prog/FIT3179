
// CHART 10: AUSTRALIA POST NETWORK RADAR
const chart10 = {
  "$schema": "https://vega.github.io/schema/vega/v6.json",

  "width": 800,
  "height": 650,

  "padding": {
    "top": 90,
    "left": 100,
    "right": 100,
    "bottom": 100
  },

  "autosize": {
    "type": "none",
    "contains": "padding"
  },
  // SIGNALS
  "signals": [
    {
      "name": "radius",
      "update": "min(width, height) * 0.40"
    }
  ],

  "data": [
    // Original CSV
    {
      "name": "table",

      "url": "data/postal_network_radar.csv",

      "format": {
        "type": "csv",
        "parse": {
          "Actual": "number",
          "Index": "number",
          "Order": "number"
        }
      },

      "transform": [
        // 5 dimensions = 72 degrees apart
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },

    // FY2024 ONLY
    {
      "name": "FY2024",

      "source": "table",

      "transform": [
        {
          "type": "filter",
          "expr": "datum.Year === 'FY2024'"
        },

        {
          "type": "collect",
          "sort": {
            "field": "Order",
            "order": "ascending"
          }
        }
      ]
    },

    // FY2025 ONLY
    {
      "name": "FY2025",

      "source": "table",

      "transform": [
        {
          "type": "filter",
          "expr": "datum.Year === 'FY2025'"
        },

        {
          "type": "collect",
          "sort": {
            "field": "Order",
            "order": "ascending"
          }
        }
      ]
    },
    // Radar axes
    {
      "name": "axes",

      "values": [
        {
          "Indicator": "Delivery points",
          "Order": 0
        },
        {
          "Indicator": "Post Offices",
          "Order": 1
        },
        {
          "Indicator": "Parcel Locker banks",
          "Order": 2
        },
        {
          "Indicator": "Street Posting Boxes",
          "Order": 3
        },
        {
          "Indicator": "eDVs / eAMBs",
          "Order": 4
        }
      ],

      "transform": [
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },
    // Radar grid
    {
      "name": "grid",

      "values": [

        {"Level": 75, "Order": 0},
        {"Level": 75, "Order": 1},
        {"Level": 75, "Order": 2},
        {"Level": 75, "Order": 3},
        {"Level": 75, "Order": 4},

        {"Level": 100, "Order": 0},
        {"Level": 100, "Order": 1},
        {"Level": 100, "Order": 2},
        {"Level": 100, "Order": 3},
        {"Level": 100, "Order": 4},

        {"Level": 125, "Order": 0},
        {"Level": 125, "Order": 1},
        {"Level": 125, "Order": 2},
        {"Level": 125, "Order": 3},
        {"Level": 125, "Order": 4}
      ],

      "transform": [
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },

    // Scale labels
    {
      "name": "levelLabels",

      "values": [
        {"Level": 75},
        {"Level": 100},
        {"Level": 125}
      ]
    }
  ],

  // SCALES
  "scales": [
    {
      "name": "radial",
      "type": "linear",
      "domain": [75, 125],
      "range": {
        "signal": "[radius * 0.20, radius]"
      },
      "zero": false,
      "nice": false
    },

    {
      "name": "color",
      "type": "ordinal",
      "domain": [
        "FY2024",
        "FY2025"
      ],

      "range": [
        "#A8A8A8",
        "#527298"
      ]
    }
  ],
  // CENTRE RADAR
  "encode": {
    "enter": {

      "x": {
        "signal": "width / 2"
      },

      "y": {
        "signal": "height / 2"
      }
    }
  },

  // MARKS
  "marks": [
    // GRID POLYGONS: 75 / 100 / 125
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "grid",
          "name": "gridFacet",
          "groupby": ["Level"]
        }
      },

      "data": [
        {
          "name": "sortedGrid",
          "source": "gridFacet",

          "transform": [
            {
              "type": "collect",
              "sort": {
                "field": "Order",
                "order": "ascending"
              }
            }
          ]
        }
      ],

      "marks": [
        {
          "type": "line",
          "from": {
            "data": "sortedGrid"
          },
          "encode": {
            "enter": {
              "interpolate": {
                "value": "linear-closed"
              },
              "x": {
                "signal":
                  "scale('radial', datum.Level) * cos(datum.Angle)"
              },
              "y": {
                "signal":
                  "scale('radial', datum.Level) * sin(datum.Angle)"
              },
              "stroke": {
                "signal":
                  "datum.Level === 100 ? '#999999' : '#D8D8D8'"
              },
              "strokeWidth": {
                "signal":
                  "datum.Level === 100 ? 2 : 1"
              },
              "strokeDash": {
                "signal":
                  "datum.Level === 100 ? [5,4] : [1,0]"
              },

              "fill": {
                "value": null
              }
            }
          }
        }
      ]
    },

    // FIVE RADIAL SPOKES
    {
      "type": "rule",
      "from": {
        "data": "axes"
      },
      "encode": {
        "enter": {
          "x": {
            "value": 0
          },
          "y": {
            "value": 0
          },
          "x2": {
            "signal":
              "radius * cos(datum.Angle)"
          },
          "y2": {
            "signal":
              "radius * sin(datum.Angle)"
          },
          "stroke": {
            "value": "#D8D8D8"
          },

          "strokeWidth": {
            "value": 1
          }
        }
      }
    },

    // FY2024 POLYGON
    {
      "type": "line",

      "from": {
        "data": "FY2024"
      },

      "encode": {
        "enter": {

          "interpolate": {
            "value": "linear-closed"
          },

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "stroke": {
            "value": "#999999"
          },

          "strokeWidth": {
            "value": 2
          },

          "strokeDash": {
            "value": [6, 4]
          },

          "fillOpacity": {
            "value": 0
          }
        }
      }
    },
    // FY2025 POLYGON
    {
      "type": "line",

      "from": {
        "data": "FY2025"
      },

      "encode": {
        "enter": {

          "interpolate": {
            "value": "linear-closed"
          },

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "stroke": {
            "value": "#527298"
          },

          "strokeWidth": {
            "value": 3
          },

          "fill": {
            "value": "#527298"
          },

          "fillOpacity": {
            "value": 0.12
          }
        }
      }
    },

    // FY2024 POINTS
    {
      "type": "symbol",
      "from": {
        "data": "FY2024"
      },
      "encode": {
        "enter": {
          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },
          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },
          "size": {
            "value": 110
          },
          "fill": {
            "value": "#A8A8A8"
          },
          "stroke": {
            "value": "white"
          },
          "strokeWidth": {
            "value": 1.5
          },
          "tooltip": {
            "signal":
              "{'Indicator': datum.Indicator," +
              "'Year': datum.Year," +
              "'Actual value': datum.Actual," +
              "'Index': format(datum.Index, '.1f')," +
              "'Change from FY2024': 'Baseline'}"
          }
        },

        "hover": {
          "size": {
            "value": 200
          }
        }
      }
    },

    // FY2025 POINTS
    {
      "type": "symbol",

      "from": {
        "data": "FY2025"
      },

      "encode": {

        "enter": {

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "size": {
            "value": 120
          },

          "fill": {
            "value": "#527298"
          },

          "stroke": {
            "value": "white"
          },

          "strokeWidth": {
            "value": 1.5
          },

          "tooltip": {
            "signal":
              "{'Indicator': datum.Indicator," +
              "'Year': datum.Year," +
              "'Actual value': datum.Actual," +
              "'Index': format(datum.Index, '.1f')," +
              "'Change from FY2024': format(datum.Index - 100, '+.1f') + '%'}"
          }
        },

        "hover": {
          "size": {
            "value": 220
          }
        }
      }
    },

    // INDICATOR LABELS
    {
      "type": "text",

      "from": {
        "data": "axes"
      },
      "encode": {
        "enter": {
          "x": {
            "signal":
              "(radius + 28) * cos(datum.Angle)"
          },
          "y": {
            "signal":
              "(radius + 28) * sin(datum.Angle)"
          },
          "text": {
            "field": "Indicator"
          },
          "fontSize": {
            "value": 13
          },
          "fontWeight": {
            "value": "bold"
          },
          "fill": {
            "value": "#333333"
          },
          "align": [
            {
              "test": "cos(datum.Angle) > 0.2",
              "value": "left"
            },
            {
              "test": "cos(datum.Angle) < -0.2",
              "value": "right"
            },
            {
              "value": "center"
            }
          ],
          "baseline": [
            {
              "test": "sin(datum.Angle) > 0.2",
              "value": "top"
            },
            {
              "test": "sin(datum.Angle) < -0.2",
              "value": "bottom"
            },
            {
              "value": "middle"
            }
          ]
        }
      }
    },
    // 75 / 100 / 125 LABELS
    {
      "type": "text",

      "from": {
        "data": "levelLabels"
      },

      "encode": {
        "enter": {

          "x": {
            "value": 6
          },

          "y": {
            "signal":
              "-scale('radial', datum.Level)"
          },

          "text": {
            "field": "Level"
          },

          "fontSize": {
            "value": 10
          },

          "fill": {
            "value": "#666666"
          },

          "align": {
            "value": "left"
          },

          "baseline": {
            "value": "middle"
          }
        }
      }
    }
  ],


  // =======================================================
  // LEGEND
  // =======================================================

  "legends": [
    {
      "fill": "color",
      "title": null,
      "orient": "bottom",
      "direction": "horizontal",
      "symbolType": "circle",
      "labelFontSize": 12
    }
  ]
};