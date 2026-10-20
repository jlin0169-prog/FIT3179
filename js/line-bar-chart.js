const chart1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 340,
    "background": null,

    "data": {
        "url": "data/postal_paradox.csv"
    },

    "layer": [
        // 1. Addressed letter volume (blue bars)
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
                        "title": "Letters (billion)",
                        "format": ".2f"
                    }
                ]
            }
        },

        // 2. Delivery points (gold line)
        {
            "mark": {
                "type": "line",
                "color": "#C9872C",
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
                        "titleColor": "#C9872C"
                    }
                }
            }
        },

        // 3. Delivery points markers
        {
            "mark": {
                "type": "point",
                "filled": true,
                "color": "#F2BB72",
                "stroke": "#C9872C",
                "strokeWidth": 1.5,
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
                        "title": "Delivery points (million)",
                        "format": ".2f"
                    }
                ]
            }
        },

        // 4. First letter volume labels
        {
            "transform": [
                {
                    "filter": "datum.Year == 2019"
                },
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
                    "scale": {
                        "domain": [0, 2.3]
                    },
                    "axis": null
                },
                "text": {
                    "field": "LetterLabel",
                    "type": "nominal"
                }
            }
        },

        // 5. First delivery point labels
        {
            "transform": [
                {
                    "filter": "datum.Year == 2019"
                },
                {
                    "calculate": "format(datum.Delivery_Points_Million, '.1f') + 'm'",
                    "as": "DeliveryLabel"
                }
            ],
            "mark": {
                "type": "text",
                "color": "#A96B1F",
                "fontWeight": "bold",
                "fontSize": 13,
                "dy": 15
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
        },
        
        
       
        // 6. Gold circle around 2023 delivery point
        {
            "data": {
                "values": [
                    { "Year": 2023, "Delivery": 12.7 }
                ]
            },
            "mark": {
                "type": "point",
                "shape": "circle",
                "filled": false,
                "stroke": "#C9872C",
                "strokeWidth": 2,
                "size": 450
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "y": {
                    "field": "Delivery",
                    "type": "quantitative",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": null
                }
            }
        },

        // 7. Gold connector line
        {
            "data": {
                "values": [
                    {
                        "Year": 2023,
                        "Delivery": 12.7,
                        "EndYear": 2022,
                        "EndDelivery": 12.77
                    }
                ]
            },
            "mark": {
                "type": "rule",
                "stroke": "#C9872C",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "x2": {
                    "field": "EndYear"
                },
                "y": {
                    "field": "Delivery",
                    "type": "quantitative",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": null
                },
                "y2": {
                    "field": "EndDelivery"
                }
            }
        },

        // 8. Gold annotation text
        {
            "data": {
                "values": [
                    {
                        "Year": 2022,
                        "Delivery": 12.78,
                        "Label": [
                            "Delivery points reached",
                            "12.7m by 2023"
                        ]
                    }
                ]
            },
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "fontSize": 11,
                "fontWeight": "bold",
                "lineHeight": 15,
                "color": "#C9872C",
                "dx": -8
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "y": {
                    "field": "Delivery",
                    "type": "quantitative",
                    "scale": {
                        "domain": [12.0, 12.8],
                        "zero": false
                    },
                    "axis": null
                },
                "text": {
                    "field": "Label",
                    "type": "nominal"
                }
            }
        },

        // 9. Blue connector pointing to TOP of 2024 bar
        {
            "data": {
                "values": [
                    {
                        "Year": 2024,
                        "Letter": 1.3,
                        "EndYear": 2024,
                        "EndLetter": 1.55
                    }
                ]
            },
            "mark": {
                "type": "rule",
                "stroke": "#527FA8",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "x2": {
                    "field": "EndYear"
                },
                "y": {
                    "field": "Letter",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 2.3]
                    },
                    "axis": null
                },
                "y2": {
                    "field": "EndLetter"
                }
            }
        },

        // 10. Blue annotation text above 2024 bar
        {
            "data": {
                "values": [
                    {
                        "Year": 2024,
                        "Letter": 1.65,
                        "Label": [
                            "Letter volumes fell",
                            "about 38% since 2019"
                        ]
                    }
                ]
            },
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "fontSize": 11,
                "fontWeight": "bold",
                "lineHeight": 15,
                "color": "#527FA8",
                "dx": 25
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal"
                },
                "y": {
                    "field": "Letter",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 2.3]
                    },
                    "axis": null
                },
                "text": {
                    "field": "Label",
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
