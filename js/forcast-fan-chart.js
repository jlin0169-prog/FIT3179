// Chart 11: The Decline of Letters Is Not Over
const chart11 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": "container",
  "height": 400,
  "data": {
    "url": "data/letter_volume_forecast.csv",
    "format": {
      "type": "csv",
      "parse": {
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
      "title": "Financial year",
      "axis": {
        "labelAngle": 0,
        "labelFontSize": 12,
        "titleFontSize": 13,
        "titlePadding": 12
      }
    }
  },

  "layer": [

    // =====================================================
    // FORECAST RANGE
    // =====================================================
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
          "title": "Forecast letter volume (million)",
          "scale": {
            "domain": [600, 1250]
          },
          "axis": {
            "labelFontSize": 12,
            "titleFontSize": 13,
            "titlePadding": 12,
            "grid": true,
            "gridColor": "#E0E0E0"
          }
        },

        "y2": {
          "field": "Pessimistic_Million"
        }
      }
    },

    // =====================================================
    // OPTIMISTIC BOUNDARY
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 2,
        "strokeDash": [6, 4]
      },

      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // =====================================================
    // PESSIMISTIC BOUNDARY
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 2,
        "strokeDash": [6, 4]
      },

      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // =====================================================
    // MEAN FORECAST
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#527298",
        "strokeWidth": 3,
        "point": {
          "filled": true,
          "size": 90
        }
      },

      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        },

        "tooltip": [
          {
            "field": "Financial_Year",
            "type": "ordinal",
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
      }
    },

    // =====================================================
    // OPTIMISTIC LABEL
    // =====================================================
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
        "dy": -35,
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

    // =====================================================
    // MEAN LABEL
    // =====================================================
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
        "dy": -30,
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
          "value": "Mean forecast"
        }
      }
    },

    // =====================================================
    // PESSIMISTIC LABEL
    // =====================================================
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
        "dy": 7,
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
    },

    // =====================================================
    // STORY ANNOTATION
    // =====================================================
    {
      "data": {
        "values": [
          {
            "Financial_Year": "FY2027-28",
            "AnnotationY": 1150,
            "Annotation":
              "Mean forecast falls about 27%\nfrom FY2025-26 to FY2028-29"
          }
        ]
      },

      "mark": {
        "type": "text",
        "align": "center",
        "baseline": "middle",
        "fontSize": 12,
        "fontWeight": "bold",
        "lineBreak": "\n",
        "lineHeight": 16,
        "color": "#527298"
      },

      "encoding": {
        "y": {
          "field": "AnnotationY",
          "type": "quantitative"
        },

        "text": {
          "field": "Annotation"
        }
      }
    }
  ],

  "config": {
    "background": "white",

    "view": {
      "stroke": null
    },

    "axis": {
      "labelColor": "#333333",
      "titleColor": "#333333",
      "domainColor": "#777777",
      "tickColor": "#777777"
    },

    "title": {
      "color": "#222222"
    }
  }
};