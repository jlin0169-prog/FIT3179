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

  "encoding": {
    "x": {
      "field": "Financial_Year",
      "type": "ordinal",
      "sort": [
        "FY2025-26",
        "FY2026-27",
        "FY2027-28",
        "FY2028-29"
      ],
      "axis": {
        "title": "Financial year",
        "labelAngle": 0,
        "labelFontSize": 12,
        "labelPadding": 10,
        "titlePadding": 15,
        "ticks": false,
        "domain": false
      }
    }
  },

  "layer": [
    // Scenario envelope
    {
      "mark": {
        "type": "area",
        "color": "#527298",
        "opacity": 0.16
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

    // Optimistic boundary
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 1.7,
        "strokeDash": [5, 4]
      },
      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // Pessimistic boundary
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 1.7,
        "strokeDash": [5, 4]
      },
      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // Main mean forecast line
    {
      "mark": {
        "type": "line",
        "color": "#527298",
        "strokeWidth": 3.5,
        "point": {
          "filled": true,
          "size": 95,
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

    // Transparent interactive points
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

    // Mean forecast label
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],
      "mark": {
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": -10,
        "dy": -17,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#527298"
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
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": -5,
        "dy": -40,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#7A96B2"
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
        "type": "text",
        "align": "right",
        "baseline": "top",
        "dx": -10,
        "dy": 10,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#7A96B2"
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
