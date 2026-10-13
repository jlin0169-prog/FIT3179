
// Chart 6: Which Online Shopping Categories Are Growing?
const chart6 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 520,
    "height": 400,
    "background": null,

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
        {
            "calculate": "toNumber(datum.Households_Million)",
            "as": "Households_Million"
        },
        {
            "calculate": "toNumber(datum.Online_Spend_Billion_AUD)",
            "as": "Online_Spend_Billion_AUD"
        },
        {
            "calculate": "toNumber(datum.YoY_Spend_Growth_Percent)",
            "as": "YoY_Spend_Growth_Percent"
        },
        {
            "calculate": "toNumber(datum.Average_Basket_Size_AUD)",
            "as": "Average_Basket_Size_AUD"
        },
        {
            "filter": "datum.Online_Spend_Billion_AUD >= MinimumSpend"
        }
    ],

    "encoding": {
        "x": {
            "field": "Households_Million",
            "type": "quantitative",
            "title": "Households shopping online (million)",
            "scale": {"domain": [0, 8]},
            "axis": {
                "grid": true,
                "gridColor": "#EEEEEE",
                "labelFontSize": 12,
                "titleFontSize": 13
            }
        },
        "y": {
            "field": "YoY_Spend_Growth_Percent",
            "type": "quantitative",
            "title": "YoY online-spend growth (%)",
            "scale": {"domain": [0, 27]},
            "axis": {
                "grid": true,
                "gridColor": "#EEEEEE",
                "labelFontSize": 12,
                "titleFontSize": 13
            }
        }
    },

    "layer": [
        // 1. Vertical reference line: Median household reach
        {
            "mark": {
                "type": "rule",
                "color": "#888888",
                "strokeDash": [6, 4],
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "datum": 3.85,
                    "type": "quantitative"
                },
                "y": {"datum": 0},
                "y2": {"datum": 27}
            }
        },

        // 2. Horizontal reference line: Median YoY growth
        {
            "mark": {
                "type": "rule",
                "color": "#888888",
                "strokeDash": [6, 4],
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {"datum": 0},
                "x2": {"datum": 8},
                "y": {
                    "datum": 15.1,
                    "type": "quantitative"
                }
            }
        },
        
        // 3. Annotation for vertical median line
        {
            "data": {
                "values": [
                    {
                        "x": 3.85,
                        "y": 26,
                        "label": "Median households: 3.85m"
                    }
                ]
            },
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 8,
                "fontSize": 11,
                "fontWeight": "bold",
                "color": "#777777"
            },
            "encoding": {
                "x": {
                    "field": "x",
                    "type": "quantitative"
                },
                "y": {
                    "field": "y",
                    "type": "quantitative"
                },
                "text": {
                    "field": "label",
                    "type": "nominal"
                }
            }
        },

        // 4. Annotation for horizontal median line
        {
            "data": {
                "values": [
                    {
                        "x": 0.1,
                        "y": 15.4,
                        "label": "Median growth: 15.1%"
                    }
                ]
            },
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dy": -7,
                "fontSize": 11,
                "fontWeight": "bold",
                "color": "#777777"
            },
            "encoding": {
                "x": {
                    "field": "x",
                    "type": "quantitative"
                },
                "y": {
                    "field": "y",
                    "type": "quantitative"
                },
                "text": {
                    "field": "label",
                    "type": "nominal"
                }
            }
        },

        // 3. Main interactive bubbles
        {
            "params": [
                {
                    "name": "CategorySelection",
                    "select": {
                        "type": "point",
                        "fields": ["Category"],
                        "on": "click",
                        "clear": "dblclick"
                    }
                }
            ],

            "mark": {
                "type": "circle",
                "stroke": "white",
                "strokeWidth": 1.5,
                "cursor": "pointer"
            },
            "encoding": {
                "size": {
                    "field": "Online_Spend_Billion_AUD",
                    "type": "quantitative",
                    "title": "Online spend ($b)",
                    "scale": {
                        "domain": [0, 20],
                        "range": [150, 1600]
                    }
                },
                "color": {
                    "condition": [
                        {
                            "test": "datum.Category === 'Online marketplaces'",
                            "value": "#DC1928"
                        },
                        {
                            "test": "datum.Category === 'Books, stationery & multimedia'",
                            "value": "#E6A23C"
                        }
                    ],
                    "value": "#527298"
                },
                "opacity": {
                    "condition": {
                        "param": "CategorySelection",
                        "value": 0.95,
                        "empty": true
                    },
                    "value": 0.25
                },
                "tooltip": [
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    },
                    {
                        "field": "Households_Million",
                        "type": "quantitative",
                        "title": "Households (million)",
                        "format": ".1f"
                    },
                    {
                        "field": "Online_Spend_Billion_AUD",
                        "type": "quantitative",
                        "title": "Online spend ($b)",
                        "format": ".1f"
                    },
                    {
                        "field": "YoY_Spend_Growth_Percent",
                        "type": "quantitative",
                        "title": "YoY spend growth (%)",
                        "format": ".1f"
                    },
                    {
                        "field": "Average_Basket_Size_AUD",
                        "type": "quantitative",
                        "title": "Average basket size ($)",
                        "format": ".2f"
                    }
                ]
            }
        },

        // 4. Labels for the two main insights
        {
            "transform": [
                {
                    "filter": "datum.Category === 'Online marketplaces' || datum.Category === 'Books, stationery & multimedia'"
                }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -12,
                "dy": -10,
                "fontSize": 10.5,
                "fontWeight": "bold",
                "color": "#252525"
            },
            "encoding": {
                "text": {
                    "field": "Category",
                    "type": "nominal"
                }
            }
        },

        // 5. Label for selected categories
        {
            "transform": [
                {
                    "filter": {
                        "param": "CategorySelection",
                        "empty": false
                    }
                },
                {
                    "filter": "datum.Category !== 'Online marketplaces' && datum.Category !== 'Books, stationery & multimedia'"
                }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 12,
                "fontSize": 11,
                "fontWeight": "bold",
                "color": "#252525"
            },
            "encoding": {
                "text": {
                    "field": "Category",
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
            "labelColor": "#606060",
            "titleColor": "#252525"
        },
        "legend": {
            "labelFontSize": 12,
            "titleFontSize": 13,
            "orient": "right"
        }
    }
};
