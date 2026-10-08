
// Chart 5: When Did Online Shopping Surge? 
const chart5 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "data/online_retail_monthly_change_multi.csv"
    },
    "transform": [
        // Positive bands
        {
            "calculate": "max(0, min(datum.Monthly_Change, 10))",
            "as": "pos1"
        },
        {
            "calculate": "max(0, min(datum.Monthly_Change - 10, 10))",
            "as": "pos2"
        },
        {
            "calculate": "max(0, min(datum.Monthly_Change - 20, 10))",
            "as": "pos3"
        },
        {
            "calculate": "max(0, min(datum.Monthly_Change - 30, 10))",
            "as": "pos4"
        },

        // Negative bands
        {
            "calculate": "max(0, min(-datum.Monthly_Change, 10))",
            "as": "neg1"
        },
        {
            "calculate": "max(0, min(-datum.Monthly_Change - 10, 10))",
            "as": "neg2"
        },
        {
            "calculate": "max(0, min(-datum.Monthly_Change - 20, 10))",
            "as": "neg3"
        },
        {
            "calculate": "max(0, min(-datum.Monthly_Change - 30, 10))",
            "as": "neg4"
        }
    ],

    "facet": {
        "row": {
            "field": "Category",
            "type": "nominal",

            "sort": [
                "Online Food Retailing",
                "Online Non-Food",
                "Online Total"
            ],
            "header": {
                "title": null,
                "labelAngle": 0,
                "labelAlign": "left",
                "labelFontSize": 14,
                "labelFontWeight": "bold",
                "labelPadding": 8
            }
        }
    },

    "spec": {
        "width": 900,
        "height": 90,
        "layer": [
            // POSITIVE 0 to 10
            {
                "mark": {
                    "type": "area",
                    "color": "#c6dbef",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal",
                        "title": null,

                        "axis": {
                            "format": "%Y",
                            "tickCount": 12
                        }
                    },
                    "y": {
                        "field": "pos1",
                        "type": "quantitative",

                        "scale": {
                            "domain": [0, 10]
                        },
                        "axis": {
                            "title": null,
                            "values": [0, 10],
                            "labelExpr": "datum.value + '%'"
                        }
                    }
                }
            },
            // POSITIVE 10 to 20
            {
                "mark": {
                    "type": "area",
                    "color": "#6baed6",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "pos2",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // POSITIVE 20 to 30
            {
                "mark": {
                    "type": "area",
                    "color": "#2171b5",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "pos3",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // POSITIVE 30 to 40
            {
                "mark": {
                    "type": "area",
                    "color": "#08306b",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "pos4",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // NEGATIVE 0 to 10
            {
                "mark": {
                    "type": "area",
                    "color": "#fdd0a2",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },

                    "y": {
                        "field": "neg1",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // NEGATIVE 10 to 20
            {
                "mark": {
                    "type": "area",
                    "color": "#fd8d3c",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },

                    "y": {
                        "field": "neg2",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // NEGATIVE 20 to 30
            {
                "mark": {
                    "type": "area",
                    "color": "#e6550d",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "neg3",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // NEGATIVE 30 to 40
            {
                "mark": {
                    "type": "area",
                    "color": "#a63603",
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "neg4",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            },
            // TOOLTIP
            {
                "mark": {
                    "type": "point",
                    "opacity": 0,
                    "size": 100
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": "pos1",
                        "type": "quantitative"
                    },
                    "tooltip": [
                        {
                            "field": "Category",
                            "type": "nominal",
                            "title": "Category"
                        },
                        {
                            "field": "Date",
                            "type": "temporal",
                            "title": "Month",
                            "format": "%B %Y"
                        },
                        {
                            "field": "Monthly_Change",
                            "type": "quantitative",
                            "title": "Monthly change (%)",
                            "format": ".1f"
                        }
                    ]
                }
            }
        ]
    },
    "resolve": {
        "scale": {
            "x": "shared",
            "y": "shared"
        }
    },
    "config": {
        "view": {
            "stroke": null
        },
        "axis": {
            "grid": false
        },
        "facet": {
            "spacing": 10
        }
    }
};