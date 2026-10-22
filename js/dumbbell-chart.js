const chart3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "autosize": {
        "type": "fit",
        "contains": "padding"
    },
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
                "labelColor": "#26384E",
                "labelOrient": "top",
                "labelAnchor": "start"
            }
        }
    },

    "spec": {
        "width": 550,
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
                "title": null,
                "axis": {
                    "labelColor": "#56677B",
                    "labelFontSize": 12,
                    "domain": true,
                    "domainColor": "#9AA7B5",
                    "ticks": true,
                    "tickColor": "#CBD5E1"
                }
            }
        },

        "layer": [
            // Neutral connecting lines
            {
                "mark": {
                    "type": "rule",
                    "color": "#96989a",
                    "strokeWidth": 2,
                    "opacity": 0.8
                },

                "encoding": {
                    "x": {
                        "field": "Revenue",
                        "type": "quantitative",
                        "title": "Revenue / expenditure ($ million)",
                        "scale": {
                            "domain": [0, 8300],
                            "nice": false
                        },
                        "axis": {
                            "values": [0, 2000, 4000, 6000, 8000],
                            "format": ",.0f",
                            "grid": false
                        }
                    },
                    "x2": {
                        "field": "Expenditure"
                    }
                }
            },

            // Revenue points
            {
                "mark": {
                    "type": "point",
                    "filled": true,
                    "color": "#6558A8",
                    "size": 140,
                    "opacity": 1
                },

                "encoding": {
                    "x": {
                        "field": "Revenue",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 8300]
                        }
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
                            "title": "Service result ($m)",
                            "format": "+,.1f"
                        }
                    ]
                }
            },

            // Expenditure points
            {
                "mark": {
                    "type": "point",
                    "filled": true,
                    "color": "#D17A52",
                    "size": 140,
                    "opacity": 1
                },

                "encoding": {
                    "x": {
                        "field": "Expenditure",
                        "type": "quantitative",
                        "scale": {
                            "domain": [0, 8300]
                        }
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
                            "title": "Service result ($m)",
                            "format": "+,.1f"
                        }
                    ]
                }
            },


            // Connector lines for FY2025 annotations
            {
                "transform": [
                    { "filter": "datum.Year === 'FY2025'" },
                    {
                        "calculate":
                            "datum.Service === 'Letters' ? 2100 : 6900",
                        "as": "LineStart"
                    },
                    {
                        "calculate":
                            "datum.Service === 'Letters' ? 2450 : 7250",
                        "as": "LineEnd"
                    }
                ],
                "mark": {
                    "type": "rule",
                    "stroke": "#8A97A6",
                    "strokeWidth": 1.5,
                    "opcity": 1,
                    "tooltip": false
                },
                "encoding": {
                    "x": {
                        "field": "LineStart",
                        "type": "quantitative"
                    },
                    "x2": {
                        "field": "LineEnd"
                    }
                }
            },

            // FY2025 Letters annotation
            {
                "transform": [
                    {
                        "filter":
                            "datum.Year === 'FY2025' && datum.Service === 'Letters'"
                    },
                    {
                        "calculate":
                            "'FY25 loss: $' + format(abs(datum.Result), ',.1f') + 'm'",
                        "as": "Annotation"
                    },
                    {
                        "calculate": "2500",
                        "as": "AnnotationX"
                    }
                ],
                "mark": {
                    "font": "Figtree",
                    "type": "text",
                    "align": "left",
                    "baseline": "middle",
                    "fontSize": 12,
                    "fontWeight": "bold",
                    "color": "#26384E"
                },
                "encoding": {
                    "x": {
                        "field": "AnnotationX",
                        "type": "quantitative"
                    },
                    "text": {
                        "field": "Annotation"
                    },
                    "tooltip": [
                        { "field": "Year", "title": "Year" },
                        {
                            "field": "Result",
                            "type": "quantitative",
                            "title": "Service result ($m)",
                            "format": "+,.1f"
                        }
                    ]
                }
            },

            // FY2025 Non-Letters annotation
            {
                "transform": [
                    {
                        "filter":
                            "datum.Year === 'FY2025' && datum.Service === 'Non-Letters'"
                    },
                    {
                        "calculate":
                            "'FY25 surplus: $' + format(datum.Result, ',.1f') + 'm'",
                        "as": "Annotation"
                    },
                    {
                        "calculate": "6800",
                        "as": "AnnotationX"
                    }
                ],
                "mark": {
                    "font": "Figtree",
                    "type": "text",
                    "align": "right",
                    "baseline": "middle",
                    "fontSize": 12,
                    "fontWeight": "bold",
                    "color": "#26384E"
                },
                "encoding": {
                    "x": {
                        "field": "AnnotationX",
                        "type": "quantitative"
                    },
                    "text": {
                        "field": "Annotation"
                    },
                    "tooltip": [
                        { "field": "Year", "title": "Year" },
                        {
                            "field": "Result",
                            "type": "quantitative",
                            "title": "Service result ($m)",
                            "format": "+,.1f"
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
            "grid": false,
            "labelFontSize": 12,
            "titleFontSize": 12,
            "labelColor": "#56677B",
            "titleColor": "#26384E",

            // Restore axis lines
            "domain": true,
            "domainColor": "#9AA7B5",
            "domainWidth": 1,

            "ticks": true,
            "tickColor": "#CBD5E1",
            "tickSize": 5
        }
    }
};
