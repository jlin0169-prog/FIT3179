

// Chart 8: Which Online Shopping Categories Are Growing?
const chart8 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 600,
    "title": "Which Online Shopping Categories Are Growing?",
    "subtitle": "Australian online shopping categories, 2025",
    "data": {
        "url": "data/online_shopping_categories.csv"
    },
    "params": [
        {
            "name": "MinimumSpend",
            "value": 0,
            "bind": {
                "input": "range",
                "min": 0,
                "max": 20,
                "step": 1,
                "name": "Minimum online spend ($b): "
            }
        }
    ],
    "transform": [
        { "calculate": "toNumber(datum.Households_Million)", "as": "Households_Million" },
        { "calculate": "toNumber(datum.Online_Spend_Billion_AUD)", "as": "Online_Spend_Billion_AUD" },
        { "calculate": "toNumber(datum.YoY_Spend_Growth_Percent)", "as": "YoY_Spend_Growth_Percent" },
        { "calculate": "toNumber(datum.Average_Basket_Size_AUD)", "as": "Average_Basket_Size_AUD" },
        { "filter": "datum.Online_Spend_Billion_AUD >= MinimumSpend" }
    ],
    "encoding": {
        "x": {
            "field": "Households_Million",
            "type": "quantitative",
            "title": "Households shopping online (million)",
            "scale": { "domain": [0, 8] }
        },
        "y": {
            "field": "YoY_Spend_Growth_Percent",
            "type": "quantitative",
            "title": "YoY online-spend growth (%)",
            "scale": { "domain": [0, 26] }
        }
    },
    "layer": [
        {
            "mark": {
                "type": "circle",
                "opacity": 0.7,
                "stroke": "white",
                "strokeWidth": 1
            },
            "encoding": {
                "size": {
                    "field": "Online_Spend_Billion_AUD",
                    "type": "quantitative",
                    "title": "Online spend ($b)",
                    "scale": {
                        "range": [150, 1600]
                    }
                },
                "color": {
                    "value": "#527298"
                },
                "tooltip": [
                    { "field": "Category", "type": "nominal", "title": "Category" },
                    { "field": "Households_Million", "type": "quantitative", "format": ".1f" },
                    { "field": "Online_Spend_Billion_AUD", "type": "quantitative", "format": ".1f" },
                    { "field": "YoY_Spend_Growth_Percent", "type": "quantitative", "format": ".1f" },
                    { "field": "Average_Basket_Size_AUD", "type": "quantitative", "format": ".2f" }
                ]
            }
        },
        {
            "transform": [
                { "filter": "datum.Category !== 'Beauty' && datum.Category !== 'Consumer electronics' && datum.Category !== 'Health & wellness' && datum.Category !== 'Hobbies & recreational goods'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 12,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category", "type": "nominal" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Beauty'" }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -10,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Beauty'" }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -10,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },

        {
            "transform": [
                { "filter": "datum.Category === 'Consumer electronics'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dx": 12,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Health & wellness'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "top",
                "dx": 12,
                "dy": 8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Hobbies & recreational goods'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dx": 12,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        }
    ],
    "config": {
        "axis": {
            "labelFontSize": 12,
            "titleFontSize": 13
        },
        "legend": {
            "labelFontSize": 12,
            "titleFontSize": 13
        }
    },
};

