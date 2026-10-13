
// Chart 4: Australia's Shift to Online Shopping
const chart4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "data": {
        "url": "data/online_retail_share.csv"
    },
    "encoding": {
        // Month
        "x": {
            "field": "Month",
            "type": "ordinal",
            "sort": [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],
            "title": "Month"
        },
        // Year
        "y": {
            "field": "Year",
            "type": "ordinal",
            "sort": "ascending",
            "title": "Year"
        }
    },

    "layer": [
        // Layer 1: Heatmap
        {
            "mark": {
                "type": "rect"
            },
            "encoding": {
                "color": {
                    "field": "Online_Share",
                    "type": "quantitative",
                    "title": "Online share (%)",
                    "scale": {
                        "schema": "yellowgreenblue"
                    }
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "title": "Year"
                    },
                    {
                        "field": "Month",
                        "title": "Month"
                    },
                    {
                        "field": "Online_Share",
                        "type": "quantitative",
                        "title": "Online retail share (%)",
                        "format": ".1f"
                    }
                ]
            }
        },
        // Layer 2: Highligh the 2 cells
        {
            "transform": [
                {
                    "filter": "(datum.Year == 2013 && datum.Month == 'Jul') || (datum.Year == 2025 && datum.Month == 'Jun')"
                }
            ],
            "mark": {
                "type": "rect",
                "fillOpacity": 0,
                "stroke": "#DC1928",
                "strokeWidth": 3
            }
        },
        // Layer 3: Labels inside the highlighted cells
        {
            "transform": [
                {
                    "filter": "(datum.Year == 2013 && datum.Month == 'Jul') || (datum.Year == 2025 && datum.Month == 'Jun')"
                },
                {
                    "calculate": "format(datum.Online_Share, '.1f') + '%'",
                    "as": "Label"
                }
            ],
            "mark": {
                "type": "text",
                "font": "Arial",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#DC1928",
                "dy": -2
            },
            "encoding": {
                "text": {
                    "field": "Label",
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
            "grid": false
        }
    }
};