
// Chart 4: Australia's Shift to Online Shopping
const chart4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "data": {
        "url": "data/online_retail_share.csv"
    },
    "mark": {
        "type": "rect"
    },
    "encoding": {
        // Year
        "y": {
            "field": "Year",
            "type": "ordinal",
            "sort": "ascending",
            "title": "Year"
        },
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
        // Online retail share
        "color": {
            "field": "Online_Share",
            "type": "quantitative",
            "title": "Online share (%)"
        },
        "tooltip": [
            {
                "field": "Year",
                "type": "ordinal",
                "title": "Year"
            },
            {
                "field": "Month",
                "type": "ordinal",
                "title": "Month"
            },
            {
                "field": "Online_Share",
                "type": "quantitative",
                "title": "Online retail share (%)",
                "format": ".1f"
            }
        ]
    },
    "config": {
        "view": {
            "stroke": null
        },

        "axis": {
            "grid": false
        }
    }
};