
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