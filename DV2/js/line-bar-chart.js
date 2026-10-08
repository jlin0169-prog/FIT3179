// Chart 1: The Postal Paradox: Fewer Letters, More Delivery Points
const chart1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 280,
    "autosize": {"type": "fit", "contains": "padding"},
    "background": null,
    "data": {
        "url": "data/postal_paradox.csv"
    },
    "encoding": {
        "x": {
            "field": "Year",
            "type": "ordinal",
            "title": null,
            "axis": { "labelAngle": 0 }
        }
    },
    "layer": [
        // Bars: Addressed letter volumn
        {
            "mark": {
                "type": "bar",
                "opacity": 0.8,
                "size": 45
            },
            "encoding": {
                "y": {
                    "field": "Letter_Volume_Billion",
                    "type": "quantitative",
                    "title": "Addressed letter volume (billion)",
                    "scale": { "zero": true }
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "ordinal",
                        "title": "Year"
                    },
                    {
                        "field": "Letter_Volume_Billion",
                        "type": "quantitative",
                        "title": "Addressed letters",
                        "format": ".1f"
                    }
                ]
            }
        },
        // Line: Delivery points
        {
            "mark": {
                "type": "line",
                "strokeWidth": 3,
                "point": {
                    "filled": true,
                    "size": 80
                }
            },
            "encoding": {
                "y": {
                    "field": "Delivery_Points_Million",
                    "type": "quantitative",
                    "title": "Delivery points (million)",
                    "scale": { "zero": false }
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "ordinal",
                        "title": "Year"
                    },
                    {
                        "field": "Delivery_Points_Million",
                        "type": "quantitative",
                        "title": "Delivery points",
                        "format": ".1f"
                    }
                ]
            }
        }
    ],
    "resolve": {
        "scale": {
            "y": "independent"
        }
    },
    "config": {
        "view": {
            "stroke": null
        },
        "axis": {
            "grid": false,
            "labelFontSize": 12,
            "titleFontSize": 13
        }
    }
};