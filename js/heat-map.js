const chart4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "background": null,

    "data": {
        "url": "data/online_retail_share.csv"
    },

    "encoding": {
        "x": {
            "field": "Month",
            "type": "ordinal",
            "sort": [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],
            "title": "Month",
            "axis": {
                "labelColor": "#56677B",
                "titleColor": "#26384E",
                "labelAngle": -45,
                "domain": true,
                "domainColor": "#9AA7B5",
                "tickColor": "#CBD5E1"
            }
        },

        "y": {
            "field": "Year",
            "type": "ordinal",
            "sort": "ascending",
            "title": "Year",
            "axis": {
                "labelColor": "#56677B",
                "titleColor": "#26384E",
                "domain": true,
                "domainColor": "#9AA7B5",
                "ticks": false
            }
        }
    },

    "layer": [
        // 1. Heatmap
        {
            "mark": {
                "type": "rect"
            },

            "encoding": {
                "color": {
                    "field": "Online_Share",
                    "type": "quantitative",
                    "title": "Online share (%)",
                    "scale": {
                        "domain": [2, 16],
                        "range": [
                            "#F3EAF2",
                            "#E5CEE0",
                            "#CCA9C7",
                            "#AD7FA9",
                            "#895D88",
                            "#603D65"
                        ]
                    },
                    "legend": {
                        "titleColor": "#26384E",
                        "labelColor": "#56677B",
                        "gradientLength": 180
                    }
                },

                "tooltip": [
                    {
                        "field": "Year",
                        "title": "Year"
                    },
                    {
                        "field": "Month",
                        "title": "Month"
                    },
                    {
                        "field": "Online_Share",
                        "type": "quantitative",
                        "title": "Online retail share (%)",
                        "format": ".1f"
                    }
                ]
            }
        },

        // 2. Highlight July 2013
        {
            "transform": [
                {
                    "filter":
                        "datum.Year == 2013 && datum.Month == 'Jul'"
                }
            ],
            "mark": {
                "type": "rect",
                "fillOpacity": 0,
                "stroke": "#603D65",
                "strokeWidth": 2.5
            }
        },

        // 3. Highlight June 2025
        {
            "transform": [
                {
                    "filter":
                        "datum.Year == 2025 && datum.Month == 'Jun'"
                }
            ],
            "mark": {
                "type": "rect",
                "fillOpacity": 0,
                "stroke": "#FFFFFF",
                "strokeWidth": 2.5
            }
        },

        // 4. July 2013 label
        {
            "transform": [
                {
                    "filter":
                        "datum.Year == 2013 && datum.Month == 'Jul'"
                },
                {
                    "calculate":
                        "format(datum.Online_Share, '.1f') + '%'",
                    "as": "Label"
                }
            ],
            "mark": {
                "type": "text",
                "font": "Arial",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#603D65"
            },
            "encoding": {
                "text": {
                    "field": "Label"
                }
            }
        },

        // 5. June 2025 label
        {
            "transform": [
                {
                    "filter":
                        "datum.Year == 2025 && datum.Month == 'Jun'"
                },
                {
                    "calculate":
                        "format(datum.Online_Share, '.1f') + '%'",
                    "as": "Label"
                }
            ],
            "mark": {
                "type": "text",
                "font": "Arial",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#FFFFFF"
            },
            "encoding": {
                "text": {
                    "field": "Label"
                }
            }
        }
    ],

    "config": {
        "view": {
            "stroke": null
        },

        "axis": {
            "grid": false,
            "labelFontSize": 12,
            "titleFontSize": 12
        }
    }
};
