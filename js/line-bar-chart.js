const chart1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 340,
    "background": null,
    "data": {
        "url": "data/postal_paradox.csv"
    },
    "layer": [
        // Blue bars: Addressed letter volume
        {
            "mark": {
                "type": "bar",
                "size": 43,
                "color": "#7297BB"
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": "ascending",
                    "axis": {
                        "title": null,
                        "labelAngle": 0,
                        "labelFontSize": 12
                    }
                },
                "y": {
                    "field": "Letter_Volume_Billion",
                    "type": "quantitative",
                    "title": "Addressed letters (billion)",
                    "scale": {
                        "domain": [0, 2.3]
                    },
                    "axis": {
                        "orient": "left",
                        "grid": true,
                        "gridColor": "#EEEEEE",
                        "titleColor": "#527FA8",
                        "values": [0, 0.5, 1.0, 1.5, 2.0]
                    }
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
                        "title": "Addressed letters (billion)",
                        "format": ".1f"
                    }
                ]
            }
        },

        // Red line: Delivery points
        {
            "mark": {
                "type": "line",
                "color": "#DC1928",
                "strokeWidth": 3,
                "point": false
            },

            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": "ascending"
                },

                "y": {
                    "field": "Delivery_Points_Million",
                    "type": "quantitative",
                    "title": "Delivery points (million)",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": {
                        "orient": "right",
                        "grid": false,
                        "titleColor": "#DC1928"
                    }
                }
            }
        },

        // Red points: Delivery points
        {
            "mark": {
                "type": "point",
                "filled": true,
                "color": "#DC1928",
                "size": 85
            },

            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": "ascending"
                },

                "y": {
                    "field": "Delivery_Points_Million",
                    "type": "quantitative",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": null
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
                        "format": ".1f",
                        "formatType": "number"
                    }
                ]
            }
        },

        // Annotation: First and final letter volume lables
        {
            "transform": [
                { "filter": "datum.Year == 2019 || datum.Year == 2024" },
                {
                    "calculate": "format(datum.Letter_Volume_Billion, '.1f') + 'b'",
                    "as": "LetterLabel"
                }
            ],
            "mark": {
                "type": "text",
                "color": "#527FA8",
                "fontWeight": "bold",
                "fontSize": 13,
                "dy": -12
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "y": {
                    "field": "Letter_Volume_Billion",
                    "type": "quantitative",
                    "scale": { "domain": [0, 2.3] },
                    "axis": null
                },
                "text": {
                    "field": "LetterLabel",
                    "type": "nominal"
                }
            }
        },

        // Annotation: First and final delivery points labels
        {
            "transform": [
                { "filter": "datum.Year == 2019 || datum.Year == 2024" },
                {
                    "calculate": "format(datum.Delivery_Points_Million, '.1f') + 'm'",
                    "as": "DeliveryLabel"
                }
            ],
            "mark": {
                "type": "text",
                "color": "#DC1928",
                "fontWeight": "bold",
                "fontSize": 13,
                "dx": -0,
                "dy": -15,
                "align": "center"
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "y": {
                    "field": "Delivery_Points_Million",
                    "type": "quantitative",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": null
                },
                "text": {
                    "field": "DeliveryLabel",
                    "type": "nominal"
                }
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
            "labelColor": "#555555",
            "titleFontSize": 12
        }
    }
};
