const chart11 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "background": "white",
  "width": "container",
  "height": 390,

  "data": {
    "url": "data/letter_volume_forecast.csv",
    "format": {
      "type": "csv",
      "parse": {
        "Financial_Year": "string",
        "Mean_Million": "number",
        "Optimistic_Million": "number",
        "Pessimistic_Million": "number"
      }
    }
  },
  "transform": [
    {
      "calculate": "datum.Financial_Year === 'FY2025-26' ? 0 : datum.Financial_Year === 'FY2026-27' ? 1 : datum.Financial_Year === 'FY2027-28' ? 2 : datum.Financial_Year === 'FY2028-29' ? 3 : null",
      "as": "xPos"
    }
  ],

  "encoding": {
    "x": {
      "field": "xPos",
      "type": "quantitative",
      "scale": {
        "domain": [-0.4, 4.2],
        "nice": false
      },
      "axis": {
        "title": "Financial year",
        "values": [0, 1, 2, 3],
        "labelExpr": "['FY2025-26','FY2026-27','FY2027-28','FY2028-29'][datum.value]",
        "labelAngle": 0,
        "labelFontSize": 12,
        "labelPadding": 10,
        "titlePadding": 15,
        "ticks": false,
        "domain": false,
        "grid": false
      }
    }
  },

  "layer": [
    // Forecast scenario envelope
    {
      "mark": {
        "type": "area",
        "color": "#F2E6D9",
        "opacity": 0.85
      },
      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative",
          "scale": {
            "domain": [600, 1250],
            "nice": false
          },
          "axis": {
            "title": "Letter volume (million)",
            "grid": true,
            "gridColor": "#E5EAF0",
            "tickCount": 6,
            "titlePadding": 12
          }
        },
        "y2": {
          "field": "Pessimistic_Million"
        }
      }
    },

    // Optimistic scenario boundary
    {
      "mark": {
        "type": "line",
        "color": "#C58A53",
        "strokeWidth": 1.8,
        "strokeDash": [5, 4]
      },
      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // Pessimistic scenario boundary
    {
      "mark": {
        "type": "line",
        "color": "#C58A53",
        "strokeWidth": 1.8,
        "strokeDash": [5, 4]
      },
      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // Mean forecast line
    {
      "mark": {
        "type": "line",
        "color": "#527FA8",
        "strokeWidth": 3.5,
        "point": {
          "filled": true,
          "size": 100,
          "stroke": "white",
          "strokeWidth": 1.5
        }
      },
      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        }
      }
    },

    // Interactive tooltip points
    {
      "mark": {
        "type": "point",
        "filled": true,
        "opacity": 0,
        "size": 450
      },
      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        },
        "tooltip": [
          {
            "field": "Financial_Year",
            "type": "nominal",
            "title": "Financial year"
          },
          {
            "field": "Mean_Million",
            "type": "quantitative",
            "title": "Mean (million)",
            "format": ",.1f"
          },
          {
            "field": "Optimistic_Million",
            "type": "quantitative",
            "title": "Optimistic (million)",
            "format": ",.1f"
          },
          {
            "field": "Pessimistic_Million",
            "type": "quantitative",
            "title": "Pessimistic (million)",
            "format": ",.1f"
          }
        ]
      }
    },

    // Mean label
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],
      "mark": {
        "font": "Figtree",
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": -5,
        "dy": -22,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#527FA8"
      },
      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        },
        "text": {
          "value": "Mean"
        }
      }
    },

    // Optimistic label
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],
      "mark": {
        "font": "Figtree",
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": 0,
        "dy": -50,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#A77345"
      },
      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        },
        "text": {
          "value": "Optimistic"
        }
      }
    },

    // Pessimistic label
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],
      "mark": {
        "font": "Figtree",
        "type": "text",
        "align": "right",
        "baseline": "top",
        "dx": -12,
        "dy": 5,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#A77345"
      },
      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        },
        "text": {
          "value": "Pessimistic"
        }
      }
    },

    // Highlight the final mean forecast point
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],
      "mark": {
        "font": "Figtree",
        "type": "point",
        "filled": true,
        "size": 180,
        "color": "#527FA8",
        "stroke": "#FFFFFF",
        "strokeWidth": 2
      },
      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        }
      },
      "tooltip": [
        {
          "field": "Financial_Year",
          "type": "nominal",
          "title": "Financial year"
        },
        {
          "field": "Mean_Million",
          "type": "quantitative",
          "title": "Mean forecast (million)",
          "format": ",.1f"
        },
        {
          "field": "Optimistic_Million",
          "type": "quantitative",
          "title": "Optimistic (million)",
          "format": ",.1f"
        },
        {
          "field": "Pessimistic_Million",
          "type": "quantitative",
          "title": "Pessimistic (million)",
          "format": ",.1f"
        }
      ]
    },

    // Annotation line 
    {
      "data": {
        "values": [
          {
            "xStart": 3,
            "xEnd": 3.35,
            "yStart": 770,
            "yEnd": 835
          }
        ]
      },

      "mark": {
        "type": "rule",
        "stroke": "#527FA8",
        "strokeWidth": 1.8
      },

      "encoding": {
        "x": {
          "field": "xStart",
          "type": "quantitative"
        },
        "x2": {
          "field": "xEnd"
        },
        "y": {
          "field": "yStart",
          "type": "quantitative"
        },
        "y2": {
          "field": "yEnd"
        }
      }
    },

    // Decline annotation text
    {
      "data": {
        "values": [
          {
            "xText": 3.42,
            "yText": 845,
            "Annotation": [
              "-27%",
              "by FY2028-29"
            ]
          }
        ]
      },

      "mark": {
        "font": "Figtree",
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "fontSize": 12,
        "fontWeight": "bold",
        "lineHeight": 19,
        "color": "#527FA8"
      },

      "encoding": {
        "x": {
          "field": "xText",
          "type": "quantitative"
        },
        "y": {
          "field": "yText",
          "type": "quantitative"
        },
        "text": {
          "field": "Annotation",
          "type": "nominal"
        }
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "axis": {
      "labelColor": "#56677B",
      "titleColor": "#26384E",
      "domain": false,
      "tickColor": "#CBD5E1"
    }
  }
};
