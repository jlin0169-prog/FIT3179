
 // Chart 7: Online Spending by State
const chart7 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "width": 480,
    "height": 360,

    "projection": {
        "type": "mercator"
    },

    "layer": [
        // Layer 1: State choropleth
        {
            "data": {
                "url": "js/states.geojson",
                "format": {
                    "type": "json",
                    "property": "features"
                }
            },

            "transform": [
                {
                    "lookup": "properties.STATE_NAME",
                    "from": {
                        "data": {
                            "url": "data/online_spending_by_state.csv"
                        },
                        "key": "State",
                        "fields": [
                            "Spending_Billion",
                            "Growth"
                        ]
                    }
                }
            ],

            "mark": {
                "type": "geoshape",
                "stroke": "#FFFFFF",
                "strokeWidth": 1
            },

            "encoding": {
                "color": {
                    "field": "Spending_Billion",
                    "type": "quantitative",
                    "title": "Online spending ($b)",
                    "scale": {
                        "scheme": "yellowgreenblue"
                    },
                    "legend": {
                        "orient": "right",
                        "gradientLength": 180,
                        "titleFontSize": 13,
                        "labelFontSize": 12
                    }
                },

                "tooltip": [
                    {
                        "field": "properties.STATE_NAME",
                        "type": "nominal",
                        "title": "State / Territory"
                    },
                    {
                        "field": "Spending_Billion",
                        "type": "quantitative",
                        "title": "Online spending ($b)",
                        "format": ".1f"
                    },
                    {
                        "field": "Growth",
                        "type": "quantitative",
                        "title": "YoY growth (%)",
                        "format": ".1f"
                    }
                ]
            }
        },
    ],

    "config": {
        "view": {
            "stroke": null
        },
        "legend": {
            "labelFont": "Arial",
            "titleFont": "Arial"
        }
    }
};
