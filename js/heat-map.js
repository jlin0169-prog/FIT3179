const chart4Months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

// Shared tooltip for the heatmap and all highlighted cells
const chart4Tooltip = [
    { field: "Year", type: "ordinal", title: "Year" },
    { field: "Month", type: "nominal", title: "Month" },
    {
        field: "Online_Share",
        type: "quantitative",
        title: "Online retail share (%)",
        format: ".1f"
    }
];

// Helper: highlighted cell with tooltip
function chart4Highlight(filter, stroke, strokeWidth = 3) {
    return {
        transform: [{ filter }],
        mark: {
            type: "rect",
            fillOpacity: 0,
            stroke: stroke,
            strokeWidth: strokeWidth
        },
        encoding: {
            tooltip: chart4Tooltip
        }
    };
}

// Helper: percentage label with tooltip
function chart4Label(filter, color) {
    return {
        transform: [
            { filter },
            {
                calculate:
                    "format(datum.Online_Share, '.1f') + '%'",
                as: "Label"
            }
        ],
        mark: {
            type: "text",
            font: "Figtree",
            fontSize: 12,
            fontWeight: "bold",
            color: color
        },
        encoding: {
            text: { field: "Label" },
            tooltip: chart4Tooltip
        }
    };
}

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
            "sort": chart4Months,
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
        // Heatmap
        {
            "mark": {
                "type": "rect",
                "tooltip": true
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
                        "labelFont": "Figtree",
                        "titleFont": "Figtree",
                        "titleColor": "#26384E",
                        "labelColor": "#56677B",
                        "gradientLength": 180
                    }
                },
                "tooltip": chart4Tooltip
            }
        },

        // First observation: July 2013
        chart4Highlight(
            "datum.Year == 2013 && datum.Month == 'Jul'",
            "#603D65",
            2.5
        ),

        // First COVID-19 lockdown: April 2020
        chart4Highlight(
            "datum.Year == 2020 && datum.Month == 'Apr'",
            "#76B900",
            3
        ),

        // Delta lockdowns: Aug-Sep 2021
        chart4Highlight(
            "datum.Year == 2021 && " +
            "(datum.Month == 'Aug' || datum.Month == 'Sep')",
            "#008F89",
            3
        ),

        // Last observation: June 2025
        chart4Highlight(
            "datum.Year == 2025 && datum.Month == 'Jun'",
            "#FFFFFF",
            2.5
        ),

        // First observation label: 2.1%
        chart4Label(
            "datum.Year == 2013 && datum.Month == 'Jul'",
            "#603D65"
        ),

        // First lockdown label: 11.1%
        chart4Label(
            "datum.Year == 2020 && datum.Month == 'Apr'",
            "#FFFFFF"
        ),

        // Delta lockdown labels: 15.0%, 15.3%
        chart4Label(
            "datum.Year == 2021 && " +
            "(datum.Month == 'Aug' || datum.Month == 'Sep')",
            "#FFFFFF"
        ),

        // Last observation label: 12.7%
        chart4Label(
            "datum.Year == 2025 && datum.Month == 'Jun'",
            "#FFFFFF"
        )
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
