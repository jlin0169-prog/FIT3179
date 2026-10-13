
// Chart 5: Online Food and Non-Food Shopping Horizon Chart

const chart5 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "background": null,

    "data": {
        "url": "data/online_retail_monthly_change_multi.csv"
    },

    "transform": [
        {
            "filter": "datum.Category === 'Online Food Retailing' || datum.Category === 'Online Non-Food'"
        },

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
                "Online Non-Food"
            ],
            "header": {
                "title": null,
                "labelAngle": 0,
                "labelAlign": "left",
                "labelFontSize": 12,
                "labelFontWeight": "bold",
                "labelPadding": 8
            }
        }
    },

    "spec": {
        "width": 500,
        "height": 145,

        "layer": [
            // Positive bands
            ...[
                ["pos1", "#c6dbef"],
                ["pos2", "#6baed6"],
                ["pos3", "#2171b5"],
                ["pos4", "#08306b"]
            ].map(([field, color]) => ({
                "mark": {
                    "type": "area",
                    "color": color,
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
                        "field": field,
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
            })),

            // Negative bands
            ...[
                ["neg1", "#fdd0a2"],
                ["neg2", "#fd8d3c"],
                ["neg3", "#e6550d"],
                ["neg4", "#a63603"]
            ].map(([field, color]) => ({
                "mark": {
                    "type": "area",
                    "color": color,
                    "clip": true
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "field": field,
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 10]
                        }
                    }
                }
            })),

            // Invisible tooltip points
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
            },

            // Vertical annotation lines
            {
                "transform": [
                    {
                        "filter": "(datum.Category === 'Online Non-Food' && year(datum.Date) === 2020 && month(datum.Date) === 3) || (datum.Category === 'Online Food Retailing' && year(datum.Date) === 2020 && month(datum.Date) === 4)"
                    }
                ],
                "mark": {
                    "type": "rule",
                    "color": "#555555",
                    "strokeDash": [3, 3],
                    "strokeWidth": 1.5
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "datum": 0
                    },
                    "y2": {
                        "datum": 10
                    }
                }
            },

            // Annotation labels
            {
                "transform": [
                    {
                        "filter": "(datum.Category === 'Online Non-Food' && year(datum.Date) === 2020 && month(datum.Date) === 3) || (datum.Category === 'Online Food Retailing' && year(datum.Date) === 2020 && month(datum.Date) === 4)"
                    },
                    {
                        "calculate": "datum.Category === 'Online Non-Food' ? 'Apr 2020: +38.2%' : 'May 2020: +27.1%'",
                        "as": "AnnotationLabel"
                    }
                ],
                "mark": {
                    "type": "text",
                    "align": "left",
                    "baseline": "top",
                    "dx": 7,
                    "dy": 5,
                    "fontSize": 10,
                    "fontWeight": "bold",
                    "color": "#252525"
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": {
                        "datum": 10
                    },
                    "text": {
                        "field": "AnnotationLabel",
                        "type": "nominal"
                    }
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
            "spacing": 16
        }
    }
};
