
// Chart 3: Australia Post's Two-Speed Business
const chart3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "autosize": {"type": "fit", "contains": "padding"},
    "background": null,
    "data": {
        "url": "data/two_speed_business.csv"
    },
    "facet": {
        "row": {
            "field": "Service",
            "type": "nominal",
            "sort": ["Letters", "Non-Letters"],
            "title": null,
            "header": {
                "labelFontSize": 16,
                "labelFontWeight": "bold",
                "labelOrient": "top",
                "labelAnchor": "start"
            }
        }
    },
    "spec": {
        "width": 620,
        "height": 180,
        "encoding": {
            "y": {
                "field": "Year",
                "type": "ordinal",
                "sort": [
                    "FY2021",
                    "FY2022",
                    "FY2023",
                    "FY2024",
                    "FY2025"
                ],
                "title": null
            }
        },
        "layer": [
            // Connecting line
            {
                "mark": {
                    "type": "rule",
                    "strokeWidth": 3
                },
                "encoding": {
                    "x": {
                        "field": "Revenue",
                        "type": "quantitative",
                        "title": "Revenue / expenditure ($ million)",
                        "scale": {
                            "domain": [0, 8300]
                        },
                        "axis": {
                            "values": [0, 2000, 4000, 6000, 8000],
                            "format": ",.0f"
                        }
                    },
                    "x2": {
                        "field": "Expenditure"
                    }
                }
            },
            // Revenue point
            {
                "mark": {
                    "type": "point",
                    "filled": true,
                    "size": 120
                },
                "encoding": {
                    "x": {
                        "field": "Revenue",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 8300]
                        }
                    },
                    "color": {
                        "datum": "Revenue",
                        "type": "nominal",
                        "title": "Measure",
                        "legend": null
                    },
                    "tooltip": [
                        {
                            "field": "Year",
                            "title": "Financial year"
                        },
                        {
                            "field": "Service",
                            "title": "Service"
                        },
                        {
                            "field": "Revenue",
                            "type": "quantitative",
                            "title": "Revenue ($m)",
                            "format": ",.1f"
                        },
                        {
                            "field": "Result",
                            "type": "quantitative",
                            "title": "Result ($m)",
                            "format": ",.1f"
                        }
                    ]
                }
            },
            // Expenditure point
            {
                "mark": {
                    "type": "point",
                    "filled": true,
                    "size": 120
                },

                "encoding": {
                    "x": {
                        "field": "Expenditure",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 8300]
                        }
                    },

                    "color": {
                        "datum": "Expenditure",
                        "type": "nominal",
                        "title": "Measure",
                        "legend": null
                    },

                    "tooltip": [
                        {
                            "field": "Year",
                            "title": "Financial year"
                        },
                        {
                            "field": "Service",
                            "title": "Service"
                        },
                        {
                            "field": "Expenditure",
                            "type": "quantitative",
                            "title": "Expenditure ($m)",
                            "format": ",.1f"
                        },
                        {
                            "field": "Result",
                            "type": "quantitative",
                            "title": "Result ($m)",
                            "format": ",.1f"
                        }
                    ]
                }
            }
        ]
    },
    "resolve": {
        "scale": {
            "x": "shared"
        }
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