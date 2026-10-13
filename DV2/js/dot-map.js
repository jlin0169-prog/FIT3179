const chart8 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 420,
  "background": null,

  "params": [
    {
      "name": "FacilityFilter",
      "value": "All facilities",
      "bind": {
        "input": "select",
        "options": [
          "All facilities",
          "Post office",
          "Post box"
        ],
        "name": "Facility type: "
      }
    },
    {
      "name": "zoom_level",
      "value": 500,
      "bind": {
        "input": "range",
        "min": 500,
        "max": 5000,
        "step": 50,
        "name": "Zoom: "
      }
    },
    {
      "name": "center_to",
      "value": [134, -26],
      "bind": {
        "input": "select",
        "options": [
          [134, -26],
          [151.21, -33.87],
          [144.96, -37.81],
          [153.03, -27.47],
          [115.86, -31.95],
          [138.60, -34.93],
          [149.13, -35.28],
          [147.33, -42.88],
          [130.84, -12.46]
        ],
        "labels": [
          "Australia",
          "Sydney",
          "Melbourne",
          "Brisbane",
          "Perth",
          "Adelaide",
          "Canberra",
          "Hobart",
          "Darwin"
        ],
        "name": "Map centre: "
      }
    }
  ],

  "projection": {
    "type": "mercator",
    "center": {"expr": "center_to"},
    "scale": {"expr": "zoom_level"},
    "translate": [300, 180]
  },

  "layer": [
    {
      "data": {
        "url": "js/states.geojson",
        "format": {
          "type": "json",
          "property": "features"
        }
      },
      "mark": {
        "type": "geoshape",
        "fill": "#F4F5F7",
        "stroke": "#9BA3AE",
        "strokeWidth": 0.8
      }
    },
    {
      "data": {
        "url": "data/australia_postal_facilities.csv"
      },
      "transform": [
        {
          "filter": "FacilityFilter == 'All facilities' || datum.Facility_Type == FacilityFilter"
        },
        {
          "calculate": "datum.Name && datum.Name != '' ? datum.Name : 'Unnamed facility'",
          "as": "DisplayName"
        },
        {
          "calculate": "datum.Operator && datum.Operator != '' ? datum.Operator : 'Not recorded'",
          "as": "DisplayOperator"
        },
        {
          "calculate": "datum.Brand && datum.Brand != '' ? datum.Brand : 'Not recorded'",
          "as": "DisplayBrand"
        }
      ],

      "mark": {
        "type": "circle",
        "size": 24,
        "opacity": 0.58,
        "stroke": "white",
        "strokeWidth": 0.15,
        "clip": true
      },

      "encoding": {
        "longitude": {
          "field": "Longitude",
          "type": "quantitative"
        },
        "latitude": {
          "field": "Latitude",
          "type": "quantitative"
        },
        "color": {
          "field": "Facility_Type",
          "type": "nominal",
          "scale": {
            "domain": ["Post office", "Post box"],
            "range": ["#C62828", "#267DA8"]
          },
          "legend": null
        },
        "tooltip": [
          {
            "field": "DisplayName",
            "type": "nominal",
            "title": "Facility"
          },
          {
            "field": "Facility_Type",
            "type": "nominal",
            "title": "Type"
          },
          {
            "field": "DisplayOperator",
            "type": "nominal",
            "title": "Operator"
          },
          {
            "field": "DisplayBrand",
            "type": "nominal",
            "title": "Brand"
          }
        ]
      }
    }
  ],

  "config": {
    "view": {"stroke": null}
  }
};
