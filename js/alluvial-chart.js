
// Chart 2: The Changing Mix of Australian Letters
const chart2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 350,
    "background": null,
    "data": {
        "url": "data/letter_mix.csv"
    },
    "transform": [
        {
            "calculate":
                "datum.Category === 'PreSort Small' ? 1 : " +
                "datum.Category === 'Other (Ordinary) Small' ? 2 : " +
                "datum.Category === 'Print Post' ? 3 : " +
                "datum.Category === 'Other (Ordinary) Large' ? 4 : 5",
            "as": "CategoryOrder"
        },
        {
            "stack": "Share",
            "groupby": ["Year"],
            "sort": [
                {
                    "field": "CategoryOrder",
                    "order": "ascending"
                }
            ],
            "as": ["y0", "y1"]
        }
    ],
    "layer": [
        // CONNECTIONS BETWEEN THE TWO YEARS
        {
            "mark": {
                "type": "area",
                "opacity": 0.45
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": ["2006/07", "2023/24"],
                    "axis": null
                },
                "y": {
                    "field": "y0",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 100]
                    },
                    "axis": null
                },
                "y2": {
                    "field": "y1"
                },
                "color": {
                    "field": "Category",
                    "type": "nominal",
                    "title": "Letter category",
                    "legend": {
                        "orient": "bottom",
                        "direction": "horizontal",
                        "columns": 3,
                        "titleFontSize": 14,
                        "labelFontSize": 11,
                        "symbolSize": 100
                    }
                },
                "detail": {
                    "field": "Category"
                },
                "order": {
                    "field": "CategoryOrder",
                    "type": "quantitative"
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "nominal",
                        "title": "Year"
                    },
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    },
                    {
                        "field": "Share",
                        "type": "quantitative",
                        "title": "Share (%)"
                    }
                ]
            }
        },
        // BLOCKS AT EACH YEAR
        {
            "mark": {
                "type": "bar",
                "size": 50,
                "stroke": "white",
                "strokeWidth": 1
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": ["2006/07", "2023/24"],
                    "title": null,
                    "axis": null
                },
                "y": {
                    "field": "y0",
                    "type": "quantitative",
                    "title": "Share of letter volume (%)",
                    "scale": {
                        "domain": [0, 100]
                    }
                },
                "y2": {
                    "field": "y1"
                },
                "color": {
                    "field": "Category",
                    "type": "nominal",
                    "title": "Letter category"
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "nominal",
                        "title": "Year"
                    },
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    },
                    {
                        "field": "Share",
                        "type": "quantitative",
                        "title": "Share (%)"
                    },
                    {
                        "field": "Volume",
                        "type": "quantitative",
                        "title": "2023/24 volume (million)",
                        "format": ".2f"
                    }
                ]
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