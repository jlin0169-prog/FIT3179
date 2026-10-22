const chart6 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",

    background: "transparent",

    autosize: {
        type: "pad",
        contains: "padding"
    },

    hconcat: [
        // Left: Choropleth map
        {
            width: 300,
            height: 320,

            title: {
                text: "Online Spending Per Resident",
                subtitle: "Darker areas indicate higher spending per person",
                font: "Libre Baskerville",
                fontSize: 15,
                fontWeight: 700,
                subtitleFont: "Figtree",
                subtitleFontSize: 12,
                subtitleFontWeight: 400,
                color: "#26384E",
                subtitleColor: "#65778C",
                anchor: "start"
            },

            projection: {
                type: "mercator"
            },

            data: {
                url: "js/states.geojson",
                format: {
                    type: "json",
                    property: "features"
                }
            },

            transform: [
                {
                    calculate: "datum.properties.STATE_NAME",
                    as: "State"
                },
                {
                    lookup: "State",
                    from: {
                        data: {
                            url: "data/online_spending_by_state.csv"
                        },
                        key: "State",
                        fields: [
                            "Spending_Billion",
                            "Growth",
                            "Population_2025"
                        ]
                    }
                },
                {
                    calculate:
                        "datum.Spending_Billion * 1000000000 / datum.Population_2025",
                    as: "Spending_Per_Capita"
                }
            ],
            params: [
                {
                    name: "selectedState",
                    select: {
                        type: "point",
                        fields: ["State"],
                        on: "click",
                        clear: "dblclick"
                    }
                }
            ],

            mark: {
                type: "geoshape",
                stroke: "#FFFFFF",
                strokeWidth: 1,
                cursor: "pointer"
            },

            encoding: {
                color: {
                    field: "Spending_Per_Capita",
                    type: "quantitative",
                    title: "Spending per resident ($)",
                    scale: {
                        "range": [
                            "#F3E9DD",
                            "#E2CDB5",
                            "#C9A27D",
                            "#A77955",
                            "#754B35"
                        ],
                        zero: false
                    },
                    legend: {
                        labelFont: "Figtree",
                        titleFont: "Figtree",
                        orient: "bottom",
                        direction: "horizontal",
                        format: ",.0f"
                    }
                },

                opacity: {
                    condition: {
                        param: "selectedState",
                        value: 1
                    },
                    value: 0.35
                },

                tooltip: [
                    {
                        field: "State",
                        type: "nominal",
                        title: "State"
                    },
                    {
                        field: "Spending_Per_Capita",
                        type: "quantitative",
                        title: "Spending per resident ($)",
                        format: ",.0f"
                    },
                    {
                        field: "Spending_Billion",
                        type: "quantitative",
                        title: "Total spending ($b)",
                        format: ".1f"
                    },
                    {
                        field: "Growth",
                        type: "quantitative",
                        title: "YoY growth (%)",
                        format: ".1f"
                    }
                ]

            }
        },

        // Right: bar chart
        {
            width: 170,
            height: 300,

            title: {
                text: "Total Online Spending by State",
                subtitle: "Click a state on the map to highlight",
                font: "Libre Baskerville",
                fontSize: 15,
                fontWeight: 700,
                subtitleFont: "Figtree",
                subtitleFontSize: 12,
                subtitleFontWeight: 400,
                color: "#26384E",
                subtitleColor: "#65778C",
                anchor: "start"
            },

            data: {
                url: "data/online_spending_by_state.csv"
            },

            mark: {
                type: "bar",
                color: "#9B6A4A",
                cornerRadiusEnd: 3
            },

            encoding: {
                y: {
                    field: "State",
                    type: "nominal",
                    sort: {
                        field: "Spending_Billion",
                        order: "descending"
                    },
                    title: null,
                },

                x: {
                    field: "Spending_Billion",
                    type: "quantitative",
                    title: "Online spending ($ billion)",
                    scale: {
                        domain: [0, 30]
                    },
                    axis: {
                        values: [0, 10, 20, 30],
                        grid: true,
                        gridColor: "#E4EAF0",
                        gridWidth: 1,
                        domain: false,
                        ticks: false,
                        labelColor: "#56677B",
                        titleColor: "#26384E"
                    }
                },

                opacity: {
                    condition: {
                        param: "selectedState",
                        value: 1,
                        empty: true
                    },
                    value: 0.25
                },

                tooltip: [
                    {
                        field: "State",
                        type: "nominal",
                        title: "State"
                    },
                    {
                        field: "Spending_Billion",
                        type: "quantitative",
                        title: "Total spending ($b)",
                        format: ".1f"
                    },
                    {
                        field: "Growth",
                        type: "quantitative",
                        title: "YoY growth (%)",
                        format: ".1f"
                    }
                ]
            }
        }
    ],

    spacing: 8,

    config: {
        view: {
            stroke: null
        },
        font: "Arial",
        axis: {
            gridColor: "#EAEAEA",
            labelColor: "#444444",
            titleColor: "#333333"
        }
    }
};