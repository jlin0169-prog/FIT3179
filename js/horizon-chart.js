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
        "width": 450,
        "height": 145,

        "layer": [
            // Positive bands
            ...[
                ["pos1", "#E8EBD4"],
                ["pos2", "#CCD5A0"],
                ["pos3", "#9DAF66"],
                ["pos4", "#657D39"]
            ].map(([field, color]) => ({
                "mark": {
                    "type": "area",
                    "color": color,
                    "opacity": 1,
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
                            "domain": [0, 10.5]
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
                ["neg1", "#F9DCE7"],
                ["neg2", "#F0A9C4"],
                ["neg3", "#D96B98"],
                ["neg4", "#A83B6D"]
            ].map(([field, color]) => ({
                "mark": {
                    "type": "area",
                    "color": color,
                    "opacity": 1,
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


            // Annotation lines - highlighted pandemic surges
            {
                "transform": [
                    {
                        "filter":
                            "(datum.Category === 'Online Non-Food' && year(toDate(datum.Date)) === 2020 && month(toDate(datum.Date)) === 3) || (datum.Category === 'Online Food Retailing' && year(toDate(datum.Date)) === 2020 && month(toDate(datum.Date)) === 4)"
                    }
                ],
                "mark": {
                    "type": "rule",
                    "color": "#657D39",
                    "strokeWidth": 2,
                    "opacity": 0.9
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": { "datum": 0 },
                    "y2": { "datum": 10 },
                    "tooltip": [
                        { "field": "Category", "title": "Category" },
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
                            "format": "+.1f"
                        }
                    ]
                }
            },

            // Annotation labels - derived from CSV
            {
                "transform": [
                    {
                        "filter":
                            "(datum.Category === 'Online Non-Food' && year(toDate(datum.Date)) === 2020 && month(toDate(datum.Date)) === 3) || (datum.Category === 'Online Food Retailing' && year(toDate(datum.Date)) === 2020 && month(toDate(datum.Date)) === 4)"
                    },
                    {
                        "calculate":
                            "timeFormat(toDate(datum.Date), '%b %Y') + ': ' + format(datum.Monthly_Change, '+.1f') + '%'",
                        "as": "AnnotationLabel"
                    }
                ],
                "mark": {
                    "type": "text",
                    "align": "left",
                    "baseline": "top",
                    "dx": 7,
                    "dy": 5,
                    "fontSize": 11,
                    "fontWeight": "bold",
                    "color": "#657D39"
                },
                "encoding": {
                    "x": {
                        "field": "Date",
                        "type": "temporal"
                    },
                    "y": { "datum": 10 },
                    "text": {
                        "field": "AnnotationLabel"
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
