const chart9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "width": "container",
    "height": 300,
    "background": null,

    "data": {
        "url": "data/postal_network_change.csv"
    },

    "transform": [
        {
            "filter": "datum.Year == 'FY2025'"
        },
        {
            "calculate": "toNumber(datum.Index) - 100",
            "as": "Change"
        },
        {
            "calculate": "datum.Indicator == 'Parcel Locker banks' ? 'Parcel locker banks' : datum.Indicator",
            "as": "IndicatorName"
        },
        {
            "calculate": "datum.Change >= 0 ? 'Increase' : 'Decrease'",
            "as": "Direction"
        },
        {
            "calculate": "(datum.Change > 0 ? '+' : '') + format(datum.Change, '.1f') + '%'",
            "as": "ChangeLabel"
        }
    ],

    "encoding": {
        "y": {
            "field": "IndicatorName",
            "type": "nominal",
            "sort": {
                "field": "Change",
                "op": "max",
                "order": "descending"
            },
            "title": null,
            "axis": {
                "labelFontSize": 13,
                "labelLimit": 190,
                "ticks": false,
                "domain": false
            }
        },

        "x": {
            "field": "Change",
            "type": "quantitative",
            "title": "Change from FY2024 to FY2025 (%)",
            "scale": {
                "domain": [-22, 25]
            },
            "axis": {
                "values": [-20, -10, 0, 10, 20],
                "labelExpr": "datum.value + '%'",
                "grid": true,
                "gridColor": "#E4E8EB",
                "gridWidth": 1,
                "titlePadding": 15,
                "labelColor": "#56677B",
                "titleColor": "#26384E"
            }
        }
    },

    "layer": [
        // Zero reference line
        {
            "mark": {
                "type": "rule",
                "color": "#66717C",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "datum": 0
                }
            }
        },

        // Diverging bars
        {
            "mark": {
                "type": "bar",
                "size": 25,
                "cornerRadiusEnd": 3
            },

            "encoding": {
                "color": {
                    "field": "Direction",
                    "type": "nominal",
                    "scale": {
                        "domain": ["Increase", "Decrease"],
                        "range": ["#63813B", "#D65F8B"]
                    },
                    "legend": null
                },

                "tooltip": [
                    {
                        "field": "IndicatorName",
                        "type": "nominal",
                        "title": "Infrastructure"
                    },
                    {
                        "field": "Change",
                        "type": "quantitative",
                        "title": "Change (%)",
                        "format": "+.1f"
                    },
                    {
                        "field": "Actual",
                        "type": "quantitative",
                        "title": "FY2025 count",
                        "format": ",.0f"
                    }
                ]
            }
        },

        // Positive percentage labels
        {
            "transform": [
                {
                    "filter": "datum.Change >= 0"
                }
            ],

            "mark": {
                "font": "Figtree",
                "type": "text",
                "align": "left",
                "dx": 7,
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#63813B"
            },

            "encoding": {
                "text": {
                    "field": "ChangeLabel",
                    "type": "nominal"
                }
            }
        },

        // Negative percentage labels
        {
            "transform": [
                {
                    "filter": "datum.Change < 0"
                }
            ],

            "mark": {
                "font": "Figtree",
                "type": "text",
                "align": "right",
                "dx": -7,
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#D65F8B"
            },

            "encoding": {
                "text": {
                    "field": "ChangeLabel",
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
            "labelColor": "#555555",
            "titleFontSize": 12
        }
    }
};
