
// Chart 6: Australia's Online Shopping Markets
const chart6 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 700,
    "height": 500,
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
    "projection": {
        "type": "mercator"
    },
    "mark": {
        "type": "geoshape",
        "stroke": "white",
        "strokeWidth": 1
    },
    "encoding": {
        "color": {
            "field": "Spending_Billion",
            "type": "quantitative",
            "title": "Online spending ($b)"
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
                "format": ".0f"
            }
        ]
    },
    "config": {
        "view": {
            "stroke": null
        }
    }
};