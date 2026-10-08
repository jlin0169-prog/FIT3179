// Chart 1: The Postal Paradox: Fewer Letters, More Delivery Points
const chart1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "autosize": {"type": "fit", "contains": "padding"},
    "background": null,
    "data": {
        "url": "data/postal_paradox.csv"
    },
    "encoding": {
        "x": {
            "field": "Year",
            "type": "ordinal",
            "title": null,
            "axis": { "labelAngle": 0 }
        }
    },
    "layer": [
        // Bars: Addressed letter volumn
        {
            "mark": {
                "type": "bar",
                "opacity": 0.8,
                "size": 45
            },
            "encoding": {
                "y": {
                    "field": "Letter_Volume_Billion",
                    "type": "quantitative",
                    "title": "Addressed letter volume (billion)",
                    "scale": { "zero": true }
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
                        "title": "Addressed letters",
                        "format": ".1f"
                    }
                ]
            }
        },
        // Line: Delivery points
        {
            "mark": {
                "type": "line",
                "strokeWidth": 3,
                "point": {
                    "filled": true,
                    "size": 80
                }
            },
            "encoding": {
                "y": {
                    "field": "Delivery_Points_Million",
                    "type": "quantitative",
                    "title": "Delivery points (million)",
                    "scale": { "zero": false }
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
                        "title": "Delivery points",
                        "format": ".1f"
                    }
                ]
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
            "grid": false,
            "labelFontSize": 12,
            "titleFontSize": 13
        }
    }
};

// Embed Chart 1
vegaEmbed("#chart1", chart1, {
    "actions": false
});

// Chart 2: The Changing Mix of Australian Letters
const chart2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "background": null,
    "data": {
        "url": "data/letter_mix.csv"
    },
    "transform": [
        {
            "calculate":
                "datum.Category === 'PreSort Small' ? 1 : " +
                "datum.Category === 'Other (Ordinary) Small' ? 2 : " +
                "datum.Category === 'Print Post' ? 3 : " +
                "datum.Category === 'Other (Ordinary) Large' ? 4 : 5",
            "as": "CategoryOrder"
        },
        {
            "stack": "Share",
            "groupby": ["Year"],
            "sort": [
                {
                    "field": "CategoryOrder",
                    "order": "ascending"
                }
            ],
            "as": ["y0", "y1"]
        }
    ],
    "layer": [
        // CONNECTIONS BETWEEN THE TWO YEARS
        {
            "mark": {
                "type": "area",
                "opacity": 0.45
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": ["2006/07", "2023/24"],
                    "axis": null
                },
                "y": {
                    "field": "y0",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 100]
                    },
                    "axis": null
                },
                "y2": {
                    "field": "y1"
                },
                "color": {
                    "field": "Category",
                    "type": "nominal",
                    "title": "Letter category"
                },
                "detail": {
                    "field": "Category"
                },
                "order": {
                    "field": "CategoryOrder",
                    "type": "quantitative"
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "nominal",
                        "title": "Year"
                    },
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    },
                    {
                        "field": "Share",
                        "type": "quantitative",
                        "title": "Share (%)"
                    }
                ]
            }
        },
        // BLOCKS AT EACH YEAR
        {
            "mark": {
                "type": "bar",
                "size": 50,
                "stroke": "white",
                "strokeWidth": 1
            },
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "ordinal",
                    "sort": ["2006/07", "2023/24"],
                    "title": null,
                    "axis": {
                        "labelAngle": 0,
                        "labelFontSize": 14
                    }
                },
                "y": {
                    "field": "y0",
                    "type": "quantitative",
                    "title": "Share of letter volume (%)",
                    "scale": {
                        "domain": [0, 100]
                    }
                },
                "y2": {
                    "field": "y1"
                },
                "color": {
                    "field": "Category",
                    "type": "nominal",
                    "title": "Letter category"
                },
                "tooltip": [
                    {
                        "field": "Year",
                        "type": "nominal",
                        "title": "Year"
                    },
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    },
                    {
                        "field": "Share",
                        "type": "quantitative",
                        "title": "Share (%)"
                    },
                    {
                        "field": "Volume",
                        "type": "quantitative",
                        "title": "2023/24 volume (million)",
                        "format": ".2f"
                    }
                ]
            }
        }
    ],
    "config": {
        "view": {
            "stroke": null
        },

        "axis": {
            "grid": false
        }
    }
};

// Embed Chart 2
vegaEmbed("#chart2", chart2, {
    "actions": false
});

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
        "width": 1000,
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

// Embed Chart 3
vegaEmbed("#chart3", chart3, {
    "actions": false
});

// Chart 4: Australia's Shift to Online Shopping
const chart4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 400,
    "data": {
        "url": "data/online_retail_share.csv"
    },
    "mark": {
        "type": "rect"
    },
    "encoding": {
        // Year
        "y": {
            "field": "Year",
            "type": "ordinal",
            "sort": "ascending",
            "title": "Year"
        },
        // Month
        "x": {
            "field": "Month",
            "type": "ordinal",
            "sort": [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],
            "title": "Month"
        },
        // Online retail share
        "color": {
            "field": "Online_Share",
            "type": "quantitative",
            "title": "Online share (%)"
        },
        "tooltip": [
            {
                "field": "Year",
                "type": "ordinal",
                "title": "Year"
            },
            {
                "field": "Month",
                "type": "ordinal",
                "title": "Month"
            },
            {
                "field": "Online_Share",
                "type": "quantitative",
                "title": "Online retail share (%)",
                "format": ".1f"
            }
        ]
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

// Embed Chart 4
vegaEmbed("#chart4", chart4, {
    "actions": false
});


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

vegaEmbed("#chart5", chart5, {
    "actions": false
});

// Chart 6: Australia's Online Shopping Markets
const chart6 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 700,
    "height": 500,
    "data": {
        "url": "js/states.geojson",
        "format": {
            "type": "json",
            "property": "features"
        }
    },
    "transform": [
        {
            "lookup": "properties.STATE_NAME",

            "from": {
                "data": {
                    "url": "data/online_spending_by_state.csv"
                },

                "key": "State",

                "fields": [
                    "Spending_Billion",
                    "Growth"
                ]
            }
        }
    ],
    "projection": {
        "type": "mercator"
    },
    "mark": {
        "type": "geoshape",
        "stroke": "white",
        "strokeWidth": 1
    },
    "encoding": {
        "color": {
            "field": "Spending_Billion",
            "type": "quantitative",
            "title": "Online spending ($b)"
        },
        "tooltip": [
            {
                "field": "properties.STATE_NAME",
                "type": "nominal",
                "title": "State / Territory"
            },
            {
                "field": "Spending_Billion",
                "type": "quantitative",
                "title": "Online spending ($b)",
                "format": ".1f"
            },
            {
                "field": "Growth",
                "type": "quantitative",
                "title": "YoY growth (%)",
                "format": ".0f"
            }
        ]
    },
    "config": {
        "view": {
            "stroke": null
        }
    }
};

vegaEmbed("#chart6", chart6, {
    "actions": false
});

// CHART 7: Australia's Online Shopping Hotspots
const chart7 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 650,
    "height": 500,
    "params": [
        {
            "name": "HotspotCategory",
            "value": "Highest volume",
            "bind": {
                "input": "select",
                "options": [
                    "Highest volume",
                    "Highest per capita",
                    "Fastest growth"
                ],
                "labels": [
                    "Highest shopping volume",
                    "Highest volume per capita",
                    "Fastest growth"
                ],
                "name": "Show: "
            }
        }
    ],

    "projection": {
        "type": "mercator"
    },
    "layer": [
        // Australia base map
        {
            "data": {
                "url": "js/states.geojson",
                "format": {
                    "type": "json",
                    "property": "features"
                }
            },

            "mark": {
                "type": "geoshape",
                "fill": "#E2E8E8",
                "stroke": "#FFFFFF",
                "strokeWidth": 1.5
            }
        },
        // Hotspot circles
        {
            "data": {
                "url": "data/online_shopping_hotspots.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Rank": "number",
                        "Longitude": "number",
                        "Latitude": "number"
                    }
                }
            },
            "transform": [
                {
                    "filter": "datum.Category === HotspotCategory"
                }
            ],
            "mark": {
                "type": "circle",
                "color": "#527298",
                "stroke": "white",
                "strokeWidth": 2
            },
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },
                "size": {
                    "field": "Rank",
                    "type": "ordinal",
                    "scale": {
                        "domain": [1, 2, 3],
                        "range": [1700, 900, 250]
                    },
                    "legend": null
                },
                "tooltip": [
                    {
                        "field": "Rank",
                        "type": "quantitative",
                        "title": "Rank"
                    },
                    {
                        "field": "Location",
                        "type": "nominal",
                        "title": "Location"
                    },
                    {
                        "field": "Postcode",
                        "type": "nominal",
                        "title": "Postcode"
                    },
                    {
                        "field": "State",
                        "type": "nominal",
                        "title": "State"
                    },
                    {
                        "field": "Category",
                        "type": "nominal",
                        "title": "Category"
                    }
                ]
            }
        },
        // Rank numbers
        {
            "data": {
                "url": "data/online_shopping_hotspots.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Rank": "number",
                        "Longitude": "number",
                        "Latitude": "number"
                    }
                }
            },
            "transform": [
                {
                    "filter": "datum.Category === HotspotCategory"
                }
            ],
            "mark": {
                "type": "text",
                "fontSize": 13,
                "fontWeight": "bold",
                "color": "white"
            },
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },
                "text": {
                    "field": "Rank"
                }
            }
        },
        // Normal location labels
        // Exclude Sydney and Alexandria because they need special positioning
        {
            "data": {
                "url": "data/online_shopping_hotspots.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Rank": "number",
                        "Longitude": "number",
                        "Latitude": "number"
                    }
                }
            },
            "transform": [
                {
                    "filter": "datum.Category === HotspotCategory"
                },
                {
                    "filter":
                        "datum.Location !== 'Sydney' && datum.Location !== 'Alexandria'"
                }
            ],
            "mark": {
                "type": "text",
                "dx": 24,
                "align": "left",
                "baseline": "middle",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#333333"
            },
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },

                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },

                "text": {
                    "field": "Location"
                }
            }
        },
        // Sydney label
        // Put above the Sydney point
        {
            "data": {
                "url": "data/online_shopping_hotspots.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Longitude": "number",
                        "Latitude": "number"
                    }
                }
            },
            "transform": [
                {
                    "filter":
                        "datum.Category === HotspotCategory && datum.Location === 'Sydney'"
                }
            ],
            "mark": {
                "type": "text",
                "dx": 28,
                "dy": -25,
                "align": "left",
                "baseline": "middle",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#333333"
            },
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },
                "text": {
                    "field": "Location"
                }
            }
        },
        // Alexandria label
        // Put below the Alexandria point
        {
            "data": {
                "url": "data/online_shopping_hotspots.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Longitude": "number",
                        "Latitude": "number"
                    }
                }
            },
            "transform": [
                {
                    "filter":
                        "datum.Category === HotspotCategory && datum.Location === 'Alexandria'"
                }
            ],
            "mark": {
                "type": "text",
                "dx": 28,
                "dy": 25,
                "align": "left",
                "baseline": "middle",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#333333"
            },
            "encoding": {
                "longitude": {
                    "field": "Longitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "Latitude",
                    "type": "quantitative"
                },
                "text": {
                    "field": "Location"
                }
            }
        }
    ],
    "config": {

        "background": "#F3FAF9",

        "view": {
            "stroke": null
        },
        "legend": {
            "labelFontSize": 12,
            "titleFontSize": 13
        }
    }
};

vegaEmbed("#chart7", chart7, {
    "actions": false
});


// Chart 8: Which Online Shopping Categories Are Growing?
const chart8 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 600,
    "title": "Which Online Shopping Categories Are Growing?",
    "subtitle": "Australian online shopping categories, 2025",
    "data": {
        "url": "data/online_shopping_categories.csv"
    },
    "params": [
        {
            "name": "MinimumSpend",
            "value": 0,
            "bind": {
                "input": "range",
                "min": 0,
                "max": 20,
                "step": 1,
                "name": "Minimum online spend ($b): "
            }
        }
    ],
    "transform": [
        { "calculate": "toNumber(datum.Households_Million)", "as": "Households_Million" },
        { "calculate": "toNumber(datum.Online_Spend_Billion_AUD)", "as": "Online_Spend_Billion_AUD" },
        { "calculate": "toNumber(datum.YoY_Spend_Growth_Percent)", "as": "YoY_Spend_Growth_Percent" },
        { "calculate": "toNumber(datum.Average_Basket_Size_AUD)", "as": "Average_Basket_Size_AUD" },
        { "filter": "datum.Online_Spend_Billion_AUD >= MinimumSpend" }
    ],
    "encoding": {
        "x": {
            "field": "Households_Million",
            "type": "quantitative",
            "title": "Households shopping online (million)",
            "scale": { "domain": [0, 8] }
        },
        "y": {
            "field": "YoY_Spend_Growth_Percent",
            "type": "quantitative",
            "title": "YoY online-spend growth (%)",
            "scale": { "domain": [0, 26] }
        }
    },
    "layer": [
        {
            "mark": {
                "type": "circle",
                "opacity": 0.7,
                "stroke": "white",
                "strokeWidth": 1
            },
            "encoding": {
                "size": {
                    "field": "Online_Spend_Billion_AUD",
                    "type": "quantitative",
                    "title": "Online spend ($b)",
                    "scale": {
                        "range": [150, 1600]
                    }
                },
                "color": {
                    "value": "#527298"
                },
                "tooltip": [
                    { "field": "Category", "type": "nominal", "title": "Category" },
                    { "field": "Households_Million", "type": "quantitative", "format": ".1f" },
                    { "field": "Online_Spend_Billion_AUD", "type": "quantitative", "format": ".1f" },
                    { "field": "YoY_Spend_Growth_Percent", "type": "quantitative", "format": ".1f" },
                    { "field": "Average_Basket_Size_AUD", "type": "quantitative", "format": ".2f" }
                ]
            }
        },
        {
            "transform": [
                { "filter": "datum.Category !== 'Beauty' && datum.Category !== 'Consumer electronics' && datum.Category !== 'Health & wellness' && datum.Category !== 'Hobbies & recreational goods'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "middle",
                "dx": 12,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category", "type": "nominal" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Beauty'" }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -10,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Beauty'" }
            ],
            "mark": {
                "type": "text",
                "align": "right",
                "baseline": "bottom",
                "dx": -10,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },

        {
            "transform": [
                { "filter": "datum.Category === 'Consumer electronics'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dx": 12,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Health & wellness'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "top",
                "dx": 12,
                "dy": 8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        },
        {
            "transform": [
                { "filter": "datum.Category === 'Hobbies & recreational goods'" }
            ],
            "mark": {
                "type": "text",
                "align": "left",
                "baseline": "bottom",
                "dx": 12,
                "dy": -8,
                "fontSize": 11
            },
            "encoding": {
                "text": { "field": "Category" },
                "color": { "value": "black" }
            }
        }
    ],
    "config": {
        "axis": {
            "labelFontSize": 12,
            "titleFontSize": 13
        },
        "legend": {
            "labelFontSize": 12,
            "titleFontSize": 13
        }
    },
};

vegaEmbed("#chart8", chart8, {
    "actions": false
});

// Chart 9: Where Are Parcel Volumes Growing Fastest?
const chart9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 500,
    "data": {
        "url": "data/parcel_growth_by_state.csv"
    },
    "layer": [
        // Dorling circles
        {
            "mark": {
                "type": "circle",
                "opacity": 0.85,
                "stroke": "white",
                "strokeWidth": 2
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 7]
                    },
                    "axis": null
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "domain": [0, 7],
                        "reverse": true
                    },
                    "axis": null
                },
                "size": {
                    "field": "Growth",
                    "type": "quantitative",
                    "title": "Parcel volume growth (%)",
                    "scale": {
                        "range": [500, 6000]
                    }
                },
                "color": {
                    "field": "Growth",
                    "type": "quantitative",
                    "title": "YoY growth (%)"
                },
                "tooltip": [
                    {
                        "field": "State",
                        "type": "nominal",
                        "title": "State / Territory"
                    },
                    {
                        "field": "Growth",
                        "type": "quantitative",
                        "title": "Parcel volume growth",
                        "format": ".1f"
                    }
                ]
            }
        },
        // State abbreviation
        {
            "mark": {
                "type": "text",
                "fontSize": 14,
                "fontWeight": "bold",
                "color": "white",
                "dy": -7
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "reverse": true
                    }
                },
                "text": {
                    "field": "Abbreviation"
                }
            }
        },
        // Growth percentage
        {
            "mark": {
                "type": "text",
                "fontSize": 12,
                "color": "white",
                "dy": 10
            },
            "encoding": {
                "x": {
                    "field": "X",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Y",
                    "type": "quantitative",
                    "scale": {
                        "reverse": true
                    }
                },
                "text": {
                    "field": "Growth",
                    "type": "quantitative",
                    "format": ".1f"
                }
            }
        }
    ],
    "config": {
        "view": {
            "stroke": null
        }
    }
};

vegaEmbed("#chart9", chart9, {
    "actions": false
});


// CHART 10: AUSTRALIA POST NETWORK RADAR
const chart10 = {
  "$schema": "https://vega.github.io/schema/vega/v6.json",

  "width": 800,
  "height": 650,

  "padding": {
    "top": 90,
    "left": 100,
    "right": 100,
    "bottom": 100
  },

  "autosize": {
    "type": "none",
    "contains": "padding"
  },
  // SIGNALS
  "signals": [
    {
      "name": "radius",
      "update": "min(width, height) * 0.40"
    }
  ],

  "data": [
    // Original CSV
    {
      "name": "table",

      "url": "data/postal_network_radar.csv",

      "format": {
        "type": "csv",
        "parse": {
          "Actual": "number",
          "Index": "number",
          "Order": "number"
        }
      },

      "transform": [
        // 5 dimensions = 72 degrees apart
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },

    // FY2024 ONLY
    {
      "name": "FY2024",

      "source": "table",

      "transform": [
        {
          "type": "filter",
          "expr": "datum.Year === 'FY2024'"
        },

        {
          "type": "collect",
          "sort": {
            "field": "Order",
            "order": "ascending"
          }
        }
      ]
    },

    // FY2025 ONLY
    {
      "name": "FY2025",

      "source": "table",

      "transform": [
        {
          "type": "filter",
          "expr": "datum.Year === 'FY2025'"
        },

        {
          "type": "collect",
          "sort": {
            "field": "Order",
            "order": "ascending"
          }
        }
      ]
    },
    // Radar axes
    {
      "name": "axes",

      "values": [
        {
          "Indicator": "Delivery points",
          "Order": 0
        },
        {
          "Indicator": "Post Offices",
          "Order": 1
        },
        {
          "Indicator": "Parcel Locker banks",
          "Order": 2
        },
        {
          "Indicator": "Street Posting Boxes",
          "Order": 3
        },
        {
          "Indicator": "eDVs / eAMBs",
          "Order": 4
        }
      ],

      "transform": [
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },
    // Radar grid
    {
      "name": "grid",

      "values": [

        {"Level": 75, "Order": 0},
        {"Level": 75, "Order": 1},
        {"Level": 75, "Order": 2},
        {"Level": 75, "Order": 3},
        {"Level": 75, "Order": 4},

        {"Level": 100, "Order": 0},
        {"Level": 100, "Order": 1},
        {"Level": 100, "Order": 2},
        {"Level": 100, "Order": 3},
        {"Level": 100, "Order": 4},

        {"Level": 125, "Order": 0},
        {"Level": 125, "Order": 1},
        {"Level": 125, "Order": 2},
        {"Level": 125, "Order": 3},
        {"Level": 125, "Order": 4}
      ],

      "transform": [
        {
          "type": "formula",
          "as": "Angle",
          "expr": "-PI/2 + datum.Order * 2*PI/5"
        }
      ]
    },

    // Scale labels
    {
      "name": "levelLabels",

      "values": [
        {"Level": 75},
        {"Level": 100},
        {"Level": 125}
      ]
    }
  ],

  // SCALES
  "scales": [
    {
      "name": "radial",
      "type": "linear",
      "domain": [75, 125],
      "range": {
        "signal": "[radius * 0.20, radius]"
      },
      "zero": false,
      "nice": false
    },

    {
      "name": "color",
      "type": "ordinal",
      "domain": [
        "FY2024",
        "FY2025"
      ],

      "range": [
        "#A8A8A8",
        "#527298"
      ]
    }
  ],
  // CENTRE RADAR
  "encode": {
    "enter": {

      "x": {
        "signal": "width / 2"
      },

      "y": {
        "signal": "height / 2"
      }
    }
  },

  // MARKS
  "marks": [
    // GRID POLYGONS: 75 / 100 / 125
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "grid",
          "name": "gridFacet",
          "groupby": ["Level"]
        }
      },

      "data": [
        {
          "name": "sortedGrid",
          "source": "gridFacet",

          "transform": [
            {
              "type": "collect",
              "sort": {
                "field": "Order",
                "order": "ascending"
              }
            }
          ]
        }
      ],

      "marks": [
        {
          "type": "line",
          "from": {
            "data": "sortedGrid"
          },
          "encode": {
            "enter": {
              "interpolate": {
                "value": "linear-closed"
              },
              "x": {
                "signal":
                  "scale('radial', datum.Level) * cos(datum.Angle)"
              },
              "y": {
                "signal":
                  "scale('radial', datum.Level) * sin(datum.Angle)"
              },
              "stroke": {
                "signal":
                  "datum.Level === 100 ? '#999999' : '#D8D8D8'"
              },
              "strokeWidth": {
                "signal":
                  "datum.Level === 100 ? 2 : 1"
              },
              "strokeDash": {
                "signal":
                  "datum.Level === 100 ? [5,4] : [1,0]"
              },

              "fill": {
                "value": null
              }
            }
          }
        }
      ]
    },

    // FIVE RADIAL SPOKES
    {
      "type": "rule",
      "from": {
        "data": "axes"
      },
      "encode": {
        "enter": {
          "x": {
            "value": 0
          },
          "y": {
            "value": 0
          },
          "x2": {
            "signal":
              "radius * cos(datum.Angle)"
          },
          "y2": {
            "signal":
              "radius * sin(datum.Angle)"
          },
          "stroke": {
            "value": "#D8D8D8"
          },

          "strokeWidth": {
            "value": 1
          }
        }
      }
    },

    // FY2024 POLYGON
    {
      "type": "line",

      "from": {
        "data": "FY2024"
      },

      "encode": {
        "enter": {

          "interpolate": {
            "value": "linear-closed"
          },

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "stroke": {
            "value": "#999999"
          },

          "strokeWidth": {
            "value": 2
          },

          "strokeDash": {
            "value": [6, 4]
          },

          "fillOpacity": {
            "value": 0
          }
        }
      }
    },
    // FY2025 POLYGON
    {
      "type": "line",

      "from": {
        "data": "FY2025"
      },

      "encode": {
        "enter": {

          "interpolate": {
            "value": "linear-closed"
          },

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "stroke": {
            "value": "#527298"
          },

          "strokeWidth": {
            "value": 3
          },

          "fill": {
            "value": "#527298"
          },

          "fillOpacity": {
            "value": 0.12
          }
        }
      }
    },

    // FY2024 POINTS
    {
      "type": "symbol",
      "from": {
        "data": "FY2024"
      },
      "encode": {
        "enter": {
          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },
          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },
          "size": {
            "value": 110
          },
          "fill": {
            "value": "#A8A8A8"
          },
          "stroke": {
            "value": "white"
          },
          "strokeWidth": {
            "value": 1.5
          },
          "tooltip": {
            "signal":
              "{'Indicator': datum.Indicator," +
              "'Year': datum.Year," +
              "'Actual value': datum.Actual," +
              "'Index': format(datum.Index, '.1f')," +
              "'Change from FY2024': 'Baseline'}"
          }
        },

        "hover": {
          "size": {
            "value": 200
          }
        }
      }
    },

    // FY2025 POINTS
    {
      "type": "symbol",

      "from": {
        "data": "FY2025"
      },

      "encode": {

        "enter": {

          "x": {
            "signal":
              "scale('radial', datum.Index) * cos(datum.Angle)"
          },

          "y": {
            "signal":
              "scale('radial', datum.Index) * sin(datum.Angle)"
          },

          "size": {
            "value": 120
          },

          "fill": {
            "value": "#527298"
          },

          "stroke": {
            "value": "white"
          },

          "strokeWidth": {
            "value": 1.5
          },

          "tooltip": {
            "signal":
              "{'Indicator': datum.Indicator," +
              "'Year': datum.Year," +
              "'Actual value': datum.Actual," +
              "'Index': format(datum.Index, '.1f')," +
              "'Change from FY2024': format(datum.Index - 100, '+.1f') + '%'}"
          }
        },

        "hover": {
          "size": {
            "value": 220
          }
        }
      }
    },

    // INDICATOR LABELS
    {
      "type": "text",

      "from": {
        "data": "axes"
      },
      "encode": {
        "enter": {
          "x": {
            "signal":
              "(radius + 28) * cos(datum.Angle)"
          },
          "y": {
            "signal":
              "(radius + 28) * sin(datum.Angle)"
          },
          "text": {
            "field": "Indicator"
          },
          "fontSize": {
            "value": 13
          },
          "fontWeight": {
            "value": "bold"
          },
          "fill": {
            "value": "#333333"
          },
          "align": [
            {
              "test": "cos(datum.Angle) > 0.2",
              "value": "left"
            },
            {
              "test": "cos(datum.Angle) < -0.2",
              "value": "right"
            },
            {
              "value": "center"
            }
          ],
          "baseline": [
            {
              "test": "sin(datum.Angle) > 0.2",
              "value": "top"
            },
            {
              "test": "sin(datum.Angle) < -0.2",
              "value": "bottom"
            },
            {
              "value": "middle"
            }
          ]
        }
      }
    },
    // 75 / 100 / 125 LABELS
    {
      "type": "text",

      "from": {
        "data": "levelLabels"
      },

      "encode": {
        "enter": {

          "x": {
            "value": 6
          },

          "y": {
            "signal":
              "-scale('radial', datum.Level)"
          },

          "text": {
            "field": "Level"
          },

          "fontSize": {
            "value": 10
          },

          "fill": {
            "value": "#666666"
          },

          "align": {
            "value": "left"
          },

          "baseline": {
            "value": "middle"
          }
        }
      }
    }
  ],


  // =======================================================
  // LEGEND
  // =======================================================

  "legends": [
    {
      "fill": "color",
      "title": null,
      "orient": "bottom",
      "direction": "horizontal",
      "symbolType": "circle",
      "labelFontSize": 12
    }
  ]
};


vegaEmbed("#chart10", chart10, {
  "actions": false
});

// Chart 11: The Decline of Letters Is Not Over
const chart11 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 800,
  "height": 450,
  "data": {
    "url": "data/letter_volume_forecast.csv",
    "format": {
      "type": "csv",
      "parse": {
        "Mean_Million": "number",
        "Optimistic_Million": "number",
        "Pessimistic_Million": "number"
      }
    }
  },

  "encoding": {
    "x": {
      "field": "Financial_Year",
      "type": "ordinal",
      "sort": [
        "FY2025-26",
        "FY2026-27",
        "FY2027-28",
        "FY2028-29"
      ],
      "title": "Financial year",
      "axis": {
        "labelAngle": 0,
        "labelFontSize": 12,
        "titleFontSize": 13,
        "titlePadding": 12
      }
    }
  },

  "layer": [

    // =====================================================
    // FORECAST RANGE
    // =====================================================
    {
      "mark": {
        "type": "area",
        "color": "#527298",
        "opacity": 0.16
      },

      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative",
          "title": "Forecast letter volume (million)",
          "scale": {
            "domain": [600, 1250]
          },
          "axis": {
            "labelFontSize": 12,
            "titleFontSize": 13,
            "titlePadding": 12,
            "grid": true,
            "gridColor": "#E0E0E0"
          }
        },

        "y2": {
          "field": "Pessimistic_Million"
        }
      }
    },

    // =====================================================
    // OPTIMISTIC BOUNDARY
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 2,
        "strokeDash": [6, 4]
      },

      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // =====================================================
    // PESSIMISTIC BOUNDARY
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#8CA6C0",
        "strokeWidth": 2,
        "strokeDash": [6, 4]
      },

      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        }
      }
    },

    // =====================================================
    // MEAN FORECAST
    // =====================================================
    {
      "mark": {
        "type": "line",
        "color": "#527298",
        "strokeWidth": 3,
        "point": {
          "filled": true,
          "size": 90
        }
      },

      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        },

        "tooltip": [
          {
            "field": "Financial_Year",
            "type": "ordinal",
            "title": "Financial year"
          },
          {
            "field": "Mean_Million",
            "type": "quantitative",
            "title": "Mean forecast (million)",
            "format": ",.1f"
          },
          {
            "field": "Optimistic_Million",
            "type": "quantitative",
            "title": "Optimistic (million)",
            "format": ",.1f"
          },
          {
            "field": "Pessimistic_Million",
            "type": "quantitative",
            "title": "Pessimistic (million)",
            "format": ",.1f"
          }
        ]
      }
    },

    // =====================================================
    // OPTIMISTIC LABEL
    // =====================================================
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],

      "mark": {
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": -10,
        "dy": -35,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#7A96B2"
      },

      "encoding": {
        "y": {
          "field": "Optimistic_Million",
          "type": "quantitative"
        },

        "text": {
          "value": "Optimistic"
        }
      }
    },

    // =====================================================
    // MEAN LABEL
    // =====================================================
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],

      "mark": {
        "type": "text",
        "align": "right",
        "baseline": "bottom",
        "dx": -10,
        "dy": -30,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#527298"
      },

      "encoding": {
        "y": {
          "field": "Mean_Million",
          "type": "quantitative"
        },

        "text": {
          "value": "Mean forecast"
        }
      }
    },

    // =====================================================
    // PESSIMISTIC LABEL
    // =====================================================
    {
      "transform": [
        {
          "filter": "datum.Financial_Year === 'FY2028-29'"
        }
      ],

      "mark": {
        "type": "text",
        "align": "right",
        "baseline": "top",
        "dx": -10,
        "dy": 7,
        "fontSize": 12,
        "fontWeight": "bold",
        "color": "#7A96B2"
      },

      "encoding": {
        "y": {
          "field": "Pessimistic_Million",
          "type": "quantitative"
        },

        "text": {
          "value": "Pessimistic"
        }
      }
    },

    // =====================================================
    // STORY ANNOTATION
    // =====================================================
    {
      "data": {
        "values": [
          {
            "Financial_Year": "FY2027-28",
            "AnnotationY": 1150,
            "Annotation":
              "Mean forecast falls about 27%\nfrom FY2025-26 to FY2028-29"
          }
        ]
      },

      "mark": {
        "type": "text",
        "align": "center",
        "baseline": "middle",
        "fontSize": 12,
        "fontWeight": "bold",
        "lineBreak": "\n",
        "lineHeight": 16,
        "color": "#527298"
      },

      "encoding": {
        "y": {
          "field": "AnnotationY",
          "type": "quantitative"
        },

        "text": {
          "field": "Annotation"
        }
      }
    }
  ],

  "config": {
    "background": "white",

    "view": {
      "stroke": null
    },

    "axis": {
      "labelColor": "#333333",
      "titleColor": "#333333",
      "domainColor": "#777777",
      "tickColor": "#777777"
    },

    "title": {
      "color": "#222222"
    }
  }
};


vegaEmbed("#chart11", chart11, {
  "actions": false
});

// const chart11 = {
//     "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

//     "data": {
//         "url": "data/online_purchase_growth_by_state.csv"
//     },

//     "transform": [
//         {
//             "calculate":
//                 "indexof(datum.Period, 'Q1') >= 0 ? 'Q1 Comparison' : 'Q4 Comparison'",
//             "as": "Comparison"
//         },

//         {
//             "calculate": "datum.Growth + 4",
//             "as": "Radius"
//         },

//         {
//             "calculate":
//                 "(datum.Order % 5) * 2 * PI / 5 - PI / 2",
//             "as": "Angle"
//         },

//         {
//             "calculate":
//                 "datum.Radius * cos(datum.Angle)",
//             "as": "X"
//         },

//         {
//             "calculate":
//                 "datum.Radius * sin(datum.Angle)",
//             "as": "Y"
//         }
//     ],

//     "facet": {
//         "column": {
//             "field": "Comparison",
//             "type": "nominal",

//             "sort": [
//                 "Q1 Comparison",
//                 "Q4 Comparison"
//             ],

//             "header": {
//                 "title": null,
//                 "labelFontSize": 16,
//                 "labelFontWeight": "bold",
//                 "labelPadding": 15
//             }
//         }
//     },

//     "spec": {
//         "width": 380,
//         "height": 380,

//         "layer": [

//             // ================================================
//             // Radar lines
//             // ================================================
//             {
//                 "mark": {
//                     "type": "line",
//                     "strokeWidth": 3,
//                     "point": {
//                         "filled": true,
//                         "size": 90
//                     }
//                 },

//                 "encoding": {
//                     "x": {
//                         "field": "X",
//                         "type": "quantitative",
//                         "scale": { "domain": [-1.15, 1.15] },
//                         "axis": null
//                     },

//                     "y": {
//                         "field": "Y",
//                         "type": "quantitative",
//                         "scale": { "domain": [-1.15, 1.15] },
//                         "axis": null
//                     },

//                     "order": {
//                         "field": "Order",
//                         "type": "quantitative"
//                     },

//                     "detail": {
//                         "field": "Year"
//                     },

//                     "color": {
//                         "field": "Year",
//                         "type": "nominal",
//                         "scale": {
//                             "domain": ["FY2024", "FY2025"],
//                             "range": ["#AAAAAA", "#527298"]
//                         },
//                         "legend": {
//                             "title": null,
//                             "orient": "bottom"
//                         }
//                     }
//                 }
//             },

//             // ================================================
//             // State labels
//             // ================================================
//             {
//                 "transform": [
//                     {
//                         "filter":
//                             "datum.Period === 'Q1 FY24' || datum.Period === 'Q4 FY23'"
//                     },

//                     {
//                         "calculate":
//                             "16 * cos(datum.Angle)",
//                         "as": "LabelX"
//                     },

//                     {
//                         "calculate":
//                             "16 * sin(datum.Angle)",
//                         "as": "LabelY"
//                     }
//                 ],

//                 "mark": {
//                     "type": "text",
//                     "fontSize": 12,
//                     "fontWeight": "bold"
//                 },

//                 "encoding": {
//                     "x": {
//                         "field": "LabelX",
//                         "type": "quantitative"
//                     },

//                     "y": {
//                         "field": "LabelY",
//                         "type": "quantitative"
//                     },

//                     "text": {
//                         "field": "State"
//                     }
//                 }
//             }
//         ]
//     },

//     "resolve": {
//         "scale": {
//             "color": "shared"
//         }
//     },

//     "config": {
//         "view": {
//             "stroke": null
//         },

//         "facet": {
//             "spacing": 50
//         }
//     }
// };


// vegaEmbed("#chart11", chart11, {
//     "actions": false
// });