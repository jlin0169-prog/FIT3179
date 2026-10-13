
// Chart 9: Proportional Symbol Map
// Parcel-volume growth by state and territory

const chart9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "width": 500,
    "height": 480,
    "background": null,

    "projection": {
        "type": "mercator"
    },

    "layer": [
        // 1. Australian state boundaries
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
                "fill": "#E9ECEF",
                "stroke": "#FFFFFF",
                "strokeWidth": 1.5
            }
        },

        // 2. Proportional circles
        {
            "data": {
                "url": "data/parcel_growth_by_state.csv",
                "format": {
                    "type": "csv",
                    "parse": {
                        "Growth": "number"
                    }
                }
            },

            "transform": [
                {
                    "lookup": "Abbreviation",
                    "from": {
                        "data": {
                            "values": [
                                {"Abbreviation": "WA", "Longitude": 121, "Latitude": -26},
                                {"Abbreviation": "NT", "Longitude": 133, "Latitude": -19},
                                {"Abbreviation": "SA", "Longitude": 135, "Latitude": -30},
                                {"Abbreviation": "QLD", "Longitude": 145, "Latitude": -22},
                                {"Abbreviation": "NSW", "Longitude": 147, "Latitude": -32},
                                {"Abbreviation": "VIC", "Longitude": 144, "Latitude": -37},
                                {"Abbreviation": "TAS", "Longitude": 147, "Latitude": -42},
                                {"Abbreviation": "ACT", "Longitude": 149.1, "Latitude": -35.3}
                            ]
                        },
                        "key": "Abbreviation",
                        "fields": ["Longitude", "Latitude"]
                    }
                }
            ],

            "mark": {
                "type": "circle",
                "color": "#DC1928",
                "opacity": 0.78,
                "stroke": "#FFFFFF",
                "strokeWidth": 1.5
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
                    "field": "Growth",
                    "type": "quantitative",
                    "title": "Parcel-volume growth (%)",
                    "scale": {
                        "type": "linear",
                        "domain": [0, 13],
                        "range": [30, 2800]
                    },
                    "legend": {
                        "orient": "right",
                        "format": ".1f",
                        "values": [2, 6, 10, 12]
                    }
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
                        "title": "Parcel-volume growth (%)",
                        "format": ".1f"
                    }
                ]
            }
        },

        // 3. State abbreviation labels
        {
            "data": {
                "url": "data/parcel_growth_by_state.csv"
            },

            "transform": [
                {
                    "lookup": "Abbreviation",
                    "from": {
                        "data": {
                            "values": [
                                {"Abbreviation": "WA", "Longitude": 121, "Latitude": -26},
                                {"Abbreviation": "NT", "Longitude": 133, "Latitude": -19},
                                {"Abbreviation": "SA", "Longitude": 135, "Latitude": -30},
                                {"Abbreviation": "QLD", "Longitude": 145, "Latitude": -22},
                                {"Abbreviation": "NSW", "Longitude": 147, "Latitude": -32},
                                {"Abbreviation": "VIC", "Longitude": 144, "Latitude": -37},
                                {"Abbreviation": "TAS", "Longitude": 147, "Latitude": -42},
                                {"Abbreviation": "ACT", "Longitude": 149.1, "Latitude": -35.3}
                            ]
                        },
                        "key": "Abbreviation",
                        "fields": ["Longitude", "Latitude"]
                    }
                }
            ],

            "mark": {
                "type": "text",
                "fontSize": 12,
                "fontWeight": "bold",
                "color": "#252525",
                "dy": -15
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
                    "field": "Abbreviation",
                    "type": "nominal"
                }
            }
        }
    ],

    "config": {
        "view": {
            "stroke": null
        },
        "legend": {
            "labelFontSize": 12,
            "titleFontSize": 13,
            "labelColor": "#555555"
        }
    }
};
