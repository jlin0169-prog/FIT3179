const chart10 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "background": null,
    "width": 620,
    "height": 350,

    "data": {
        "url": "data/post_office_transaction.csv",
        "format": {
            "type": "csv",
            "parse": {
                "Region": "string",
                "Service": "string",
                "Percent": "number"
            }
        }
    },

    "transform": [
        {
            "calculate": "datum.Region === 'Major cities' ? 0 : 1",
            "as": "xPos"
        }
    ],

    "params": [
        {
            "name": "selectedService",
            "value": "All services",
            "bind": {
                "input": "select",
                "name": "Highlight service: ",
                "options": [
                    "All services",
                    "Postage",
                    "Financial services",
                    "Identity services",
                    "Other services",
                    "Consumer products"
                ]
            }
        }
    ],

    "encoding": {
        "x": {
            "field": "xPos",
            "type": "quantitative",
            "scale": {
                "domain": [-0.65, 1.65],
                "nice": false
            },
            "axis": {
                "title": null,
                "values": [0, 1],
                "labelExpr": "datum.value === 0 ? 'Major cities' : 'Very remote'",
                "labelAngle": 0,
                "labelFontSize": 13,
                "labelFontWeight": "bold",
                "labelColor": "#26384E",
                "labelPadding": 12,
                "domain": false,
                "ticks": false,
                "grid": false
            }
        },

        "y": {
            "field": "Percent",
            "type": "quantitative",
            "scale": {
                "domain": [0, 50],
                "nice": false
            },
            "axis": {
                "title": "Share of transactions (%)",
                "values": [0, 10, 20, 30, 40, 50],
                "grid": true,
                "gridColor": "#E5EAF0",
                "labelColor": "#56677B",
                "titleColor": "#26384E"
            }
        },

        "color": {
            "field": "Service",
            "type": "nominal",
            "scale": {
                "domain": [
                    "Postage",
                    "Financial services",
                    "Identity services",
                    "Other services",
                    "Consumer products"
                ],
                "range": [
                    "#d27e83",
                    "#00a1f1",
                    "#8B78BC",
                    "#e2bc87",
                    "#84e8cf"
                ]
            },
            "legend": {
                "title": "Transaction type",
                "orient": "bottom",
                "direction": "horizontal",
                "columns": 3,
                "labelFontSize": 12,
                "symbolStrokeWidth": 3,
                "symbolSize": 130,
                "titleColor": "#26384E",
                "labelColor": "#56677B"
            }
        },

        "opacity": {
            "condition": {
                "test": "selectedService === 'All services' || datum.Service === selectedService",
                "value": 1
            },
            "value": 0.12
        },

        "tooltip": [
            {
                "field": "Region",
                "type": "nominal",
                "title": "Region"
            },
            {
                "field": "Service",
                "type": "nominal",
                "title": "Service"
            },
            {
                "field": "Percent",
                "type": "quantitative",
                "title": "Transaction share (%)",
                "format": ".0f"
            }
        ]
    },

    "layer": [
        // 1. Slope lines
        {
            "mark": {
                "type": "line",
                "strokeWidth": 3
            },
            "encoding": {
                "detail": {
                    "field": "Service",
                    "type": "nominal"
                },
                "order": {
                    "field": "xPos",
                    "type": "quantitative"
                }
            }
        },

        // 2. Points
        {
            "mark": {
                "type": "point",
                "filled": true,
                "size": 140,
                "stroke": "white",
                "strokeWidth": 1.5
            }
        },

        // 3A. Percentage labels at left
        {
            "transform": [
                {
                    "filter": "datum.Region === 'Major cities'"
                },
                {
                    "calculate": "format(datum.Percent, '.0f') + '%'",
                    "as": "PercentLabel"
                }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -13,
                "fontSize": 12,
                "fontWeight": "bold",
                "lineHeight": 17
            },
            "encoding": {
                "text": {
                    "field": "PercentLabel",
                    "type": "nominal"
                }
            }
        },

        // 3B. Percentage labels at right
        {
            "transform": [
                {
                    "filter": "datum.Region === 'Very remote'"
                },
                {
                    "calculate": "format(datum.Percent, '.0f') + '%'",
                    "as": "PercentLabel"
                }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 13,
                "fontSize": 12,
                "fontWeight": "bold"
            },
            "encoding": {
                "text": {
                    "field": "PercentLabel",
                    "type": "nominal"
                }
            }
        },

        // 4. Diagonal annotation connector (/)
        {
            "data": {
                "values": [
                    {
                        "xStart": 0.78,
                        "xEnd": 0.87,
                        "yStart": 25.52,
                        "yEnd": 31
                    }
                ]
            },

            "transform": [
                {
                    "filter": "selectedService === 'All services' || selectedService === 'Postage'"
                }
            ],

            "mark": {
                "type": "rule",
                "strokeWidth": 1.5,
                "color": "#D27E83"
            },

            "encoding": {
                "x": {
                    "field": "xStart",
                    "type": "quantitative"
                },
                "x2": {
                    "field": "xEnd"
                },
                "y": {
                    "field": "yStart",
                    "type": "quantitative"
                },
                "y2": {
                    "field": "yEnd"
                },
                "color": {
                    "value": "#D27E83",
                    "legend": null
                },
                "opacity": {
                    "value": 1
                },
                "tooltip": {
                    "value": null
                }
            }
        },

        // 5. Annotation text
        {
            "data": {
                "values": [
                    {
                        "xText": 0.8,
                        "yText": 33,
                        "Annotation": [
                            "Postage: 16%",
                            "lower share in remote areas"
                        ]
                    }
                ]
            },

            "transform": [
                {
                    "filter": "selectedService === 'All services' || selectedService === 'Postage'"
                }
            ],

            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dy": -5,
                "fontSize": 12,
                "fontWeight": "bold",
                "lineHeight": 17
            },

            "encoding": {
                "x": {
                    "field": "xText",
                    "type": "quantitative"
                },
                "y": {
                    "field": "yText",
                    "type": "quantitative"
                },
                "text": {
                    "field": "Annotation",
                    "type": "nominal"
                },
                "color": {
                    "value": "#D27E83",
                    "legend": null
                },
                "opacity": {
                    "value": 1
                },
                "tooltip": {
                    "value": null
                }
            }
        }
    ],

    "config": {
        "view": {
            "stroke": null
        },
        "font": "Arial"
    }
};
