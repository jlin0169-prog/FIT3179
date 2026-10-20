const chart9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

    "width": 500,
    "height": 400,
    "background": null,

    "projection": {
        "type": "mercator",
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
                "fill": "#E5E9ED",
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
                                { "Abbreviation": "WA", "Longitude": 121, "Latitude": -26 },
                                { "Abbreviation": "NT", "Longitude": 133, "Latitude": -19 },
                                { "Abbreviation": "SA", "Longitude": 135, "Latitude": -30 },
                                { "Abbreviation": "QLD", "Longitude": 145, "Latitude": -22 },
                                { "Abbreviation": "NSW", "Longitude": 147, "Latitude": -32 },
                                { "Abbreviation": "VIC", "Longitude": 144, "Latitude": -37 },
                                { "Abbreviation": "TAS", "Longitude": 147, "Latitude": -42 },
                                { "Abbreviation": "ACT", "Longitude": 149.1, "Latitude": -35.3 }
                            ]
                        },
                        "key": "Abbreviation",
                        "fields": ["Longitude", "Latitude"]
                    }
                }
            ],

            "mark": {
                "type": "circle",
                "color": "#8E3B56",
                "opacity": 0.88,
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
                    "title": "Parcel growth (%)",
                    "scale": {
                        "type": "linear",
                        "domain": [0, 13],
                        "range": [30, 2200]
                    },
                    "legend": {
                        "orient": "bottom",
                        "format": ".0f",
                        "values": [3, 6, 9, 12],
                        "symbolFillColor": "#8E3B56",
                        "symbolStrokeColor": "#FFFFFF",
                        "offset": 0,
                        "padding": 0,
                        "titlePadding": 5,
                        "labelFontSize": 11,
                        "titleFontSize": 12
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

        // 3. Labels for highest and lowest growth rates
        {
            "data": {
                "url": "data/parcel_growth_by_state.csv"
            },

            "transform": [
                {
                    "calculate": "toNumber(datum.Growth)",
                    "as": "GrowthNum"
                },
                {
                    "filter": "datum.Abbreviation === 'NT' || datum.Abbreviation === 'TAS' || datum.Abbreviation === 'ACT'"
                },
                {
                    "lookup": "Abbreviation",
                    "from": {
                        "data": {
                            "values": [
                                {
                                    "Abbreviation": "NT",
                                    "LabelLongitude": 133,
                                    "LabelLatitude": -15.5
                                },
                                {
                                    "Abbreviation": "TAS",
                                    "LabelLongitude": 150,
                                    "LabelLatitude": -42
                                },
                                {
                                    "Abbreviation": "ACT",
                                    "LabelLongitude": 150,
                                    "LabelLatitude": -34.5
                                }
                            ]
                        },
                        "key": "Abbreviation",
                        "fields": [
                            "LabelLongitude",
                            "LabelLatitude"
                        ]
                    }
                },
                {
                    "calculate": "datum.State + ': ' + format(datum.GrowthNum, '.1f') + '%'",
                    "as": "AnnotationLabel"
                }
            ],

            "mark": {
                "type": "text",
                "fontSize": 11,
                "fontWeight": "bold",
                "color": "#542033",
                "align": "left",
                "baseline": "middle"
            },

            "encoding": {
                "longitude": {
                    "field": "LabelLongitude",
                    "type": "quantitative"
                },
                "latitude": {
                    "field": "LabelLatitude",
                    "type": "quantitative"
                },
                "text": {
                    "field": "AnnotationLabel",
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
            "labelFontSize": 11,
            "titleFontSize": 12,
            "labelColor": "#555555",
            "titleColor": "#26384E",
            "padding": 20
        }
    }
};
