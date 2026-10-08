
// Chart 9: Where Are Parcel Volumes Growing Fastest?
const chart9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 500,
    "data": {
        "url": "data/parcel_growth_by_state.csv"
    },
    "layer": [
        // Dorling circles
        {
            "mark": {
                "type": "circle",
                "opacity": 0.85,
                "stroke": "white",
                "strokeWidth": 2
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 7]
                    },
                    "axis": null
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 7],
                        "reverse": true
                    },
                    "axis": null
                },
                "size": {
                    "field": "Growth",
                    "type": "quantitative",
                    "title": "Parcel volume growth (%)",
                    "scale": {
                        "range": [500, 6000]
                    }
                },
                "color": {
                    "field": "Growth",
                    "type": "quantitative",
                    "title": "YoY growth (%)"
                },
                "tooltip": [
                    {
                        "field": "State",
                        "type": "nominal",
                        "title": "State / Territory"
                    },
                    {
                        "field": "Growth",
                        "type": "quantitative",
                        "title": "Parcel volume growth",
                        "format": ".1f"
                    }
                ]
            }
        },
        // State abbreviation
        {
            "mark": {
                "type": "text",
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "white",
                "dy": -7
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "reverse": true
                    }
                },
                "text": {
                    "field": "Abbreviation"
                }
            }
        },
        // Growth percentage
        {
            "mark": {
                "type": "text",
                "fontSize": 12,
                "color": "white",
                "dy": 10
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "reverse": true
                    }
                },
                "text": {
                    "field": "Growth",
                    "type": "quantitative",
                    "format": ".1f"
                }
            }
        }
    ],
    "config": {
        "view": {
            "stroke": null
        }
    }
};