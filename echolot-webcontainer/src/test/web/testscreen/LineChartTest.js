/*
 * This file (LineChartTest.js) is part of the Echolot Project (hereinafter "Echolot").
 * Copyright (C) 2008-2011 eXXcellent Solutions GmbH.
 *
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 */

/**
 * Testclass for the LineChart
 *
 * @author Ralf Enderle <r.enderle@exxcellent.de>
 */
exxcellent.test.LineChartTest = Core.extend({
    _lineChart: null,

    $construct: function(testArea, mainContent) {
        var controlColumn = new Echo.Column({
            styleName: "TestControl",
            children: [
                new Echo.Label({
                    text: "LineChart", styleName: "Title"
                }),
                new Echo.Label({
                    text: "Models", styleName: "Default"
                }),
                this._createButton("LineChart Model 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.LINE_CHART_MODEL, this._createLineChartModel_1().lineChartModel);
                        }
                        ),
                this._createButton("LineChart Model 2",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.LINE_CHART_MODEL, this._createLineChartModel_2().lineChartModel);
                        }
                        ),
                this._createButton("LineChart Model 3",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.LINE_CHART_MODEL, this._createLineChartModel_3().lineChartModel);
                        }
                        ),
                this._createButton("Axis Model 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.AXIS_MODEL, this._createAxisModel_1().axisModel);
                        }
                        ),
                this._createButton("Axis Model 2",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.AXIS_MODEL, this._createAxisModel_2().axisModel);
                        }
                ),
                this._createButton("Toggle - showPopup",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.SHOW_POPUP, !this._lineChart.get(exxcellent.LineChart.SHOW_POPUP));
                        }),
                this._createButton("Toggle - fillChart",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.FILL_CHART, !this._lineChart.get(exxcellent.LineChart.FILL_CHART));
                        }),
                this._createButton("Toggle - fillDifference",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.FILL_DIFFERENCE, !this._lineChart.get(exxcellent.LineChart.FILL_DIFFERENCE));
                        }),
                this._createButton("Toggle - drawGrid",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.DRAW_GRID, !this._lineChart.get(exxcellent.LineChart.DRAW_GRID));
                        }),
                new Echo.Label({
                    text: "Styling", styleName: "Default"
                }),
                this._createButton("Set Random Foreground",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.FOREGROUND, Raphael.getColor());
                        }),
                this._createButton("Set Random Fill Difference Color",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.FILL_DIFFERENCE_COLOR, Raphael.getColor());
                        }),
                this._createButton("Set Random LineColor",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.LINE_COLOR, Raphael.getColor());
                        }),
                this._createButton("Set Random DotColor",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.DOT_COLOR, Raphael.getColor());
                        }),
                this._createButton("Set Random GridColor",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.GRID_COLOR, Raphael.getColor());
                        }),
                new Echo.Label({text: "Line-Interpolation", styleName: "Default"}),
                this._createButton("NONE",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.INTERPOLATION, 'none');
                        }),
                this._createButton("LINEAR",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.INTERPOLATION, 'linear');
                        }),
                this._createButton("BEZIER",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.INTERPOLATION, 'bezier');
                        }),
                new Echo.Label({
                    text: "Scaling", styleName: "Default"
                }),
                this._createButton("xScaleMax + 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.XSCALE_MAX, this._lineChart.get(exxcellent.LineChart.XSCALE_MAX) + 10);
                        }),
                this._createButton("xScaleMax - 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.XSCALE_MAX, this._lineChart.get(exxcellent.LineChart.XSCALE_MAX) - 10);
                        }),
                this._createButton("xSectors + 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.XAXIS_SECTORS, this._lineChart.get(exxcellent.LineChart.XAXIS_SECTORS) + 1);
                        }),
                this._createButton("xSectors - 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.XAXIS_SECTORS, this._lineChart.get(exxcellent.LineChart.XAXIS_SECTORS) - 1);
                        }),
                this._createButton("yScaleMax + 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.YSCALE_MAX, this._lineChart.get(exxcellent.LineChart.YSCALE_MAX) + 10);
                        }),
                this._createButton("yScaleMax - 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.YSCALE_MAX, this._lineChart.get(exxcellent.LineChart.YSCALE_MAX) - 10);
                        }),
                this._createButton("ySectors + 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.YAXIS_SECTORS, this._lineChart.get(exxcellent.LineChart.YAXIS_SECTORS) + 1);
                        }),
                this._createButton("ySectors - 1",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.YAXIS_SECTORS, this._lineChart.get(exxcellent.LineChart.YAXIS_SECTORS) - 1);
                        }),
                new Echo.Label({
                    text: "Size", styleName: "Default"
                }),
                this._createButton("width + 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.WIDTH, this._lineChart.get(exxcellent.LineChart.WIDTH) + 10);
                        }),
                this._createButton("width - 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.WIDTH, this._lineChart.get(exxcellent.LineChart.WIDTH) - 10);
                        }),
                this._createButton("height + 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.HEIGHT, this._lineChart.get(exxcellent.LineChart.HEIGHT) + 10);
                        }),
                this._createButton("height - 10",
                        function() {
                            this._lineChart.set(exxcellent.LineChart.HEIGHT, this._lineChart.get(exxcellent.LineChart.HEIGHT) - 10);
                        })
            ]
        });

        this._lineChart = this._createLineChart();
        this._lineChart.set(exxcellent.LineChart.LINE_CHART_MODEL, this._createLineChartModel_1().lineChartModel);

        var splitPane = new Echo.SplitPane({
            styleName: "TestControl",
            children: [
                controlColumn,
                new Echo.Column({
                    styleName: "Default",
                    children: [this._lineChart]
                })
            ]
        });

        testArea.add(splitPane);
    },

    _createLineChart : function() {
        return new exxcellent.LineChart({
            font : {
                size: "12",
                typeface: ["Courier New", "Courier", "Monospace"],
                italic: true
            },
            background: '#ffcc66',
            drawGrid: true,
            gridColor: '#000',
            xaxisSectors: 11,
            yaxisSectors: 10,
            showPopup: true,
            popupBackground: '#6699ff',
            popupBorderColor: '#ff6666',
            popupForeground: '#ffffcc',
            popupFont: {
                size: "10",
                typeface: ["Courier New", "Courier", "Monospace"],
                italic: true
            },
            fillChart: false,
            lineColor: '#383',
            dotColor: '#000',
            xscaleMax: 11,
            yscaleMax: 100,
            width : 700,
            height: 400,
            fillDifference: true,
            fillDifferenceColor: '#ff0000',
        });
    },

    /**
     * Creates a LineChartModel
     */
    _createLineChartModel_1: function() {
        // the sectors
        var lines = new Array(
            new exxcellent.model.Line(
                    new Array(
                            new exxcellent.model.Point(0, 20, 'Label-Text 1', 1),
                            new exxcellent.model.Point(1, 80, 'Label-Text 2', 2),
                            new exxcellent.model.Point(2, 30, 'Label-Text 3', 3),
                            new exxcellent.model.Point(3, 90, 'Label-Text 4', 4),
                            new exxcellent.model.Point(4, 10, 'Label-Text 5', 5),
                            new exxcellent.model.Point(5, 25, 'Label-Text 6', 6),
                            new exxcellent.model.Point(6, 45, 'Label-Text 7', 7),
                            new exxcellent.model.Point(7, 70, 'Label-Text 8', 8),
                            new exxcellent.model.Point(8, 80, 'Label-Text 9', 9),
                            new exxcellent.model.Point(9, 70, 'Label-Text 10', 10),
                            new exxcellent.model.Point(10, 60, 'Label-Text 11', 11),
                            new exxcellent.model.Point(11, 60, 'Label-Text 12', 12)
                    ),
                    "line1",
                    "Label Line1"
            ),
            new exxcellent.model.Line(
                    new Array(
                            new exxcellent.model.Point(0, 10, 'l2 Label-Text 1', 8),
                            new exxcellent.model.Point(3, 40, 'l2 Label-Text 2', 9),
                            new exxcellent.model.Point(5, 20, 'l2 Label-Text 3', 10),
                            new exxcellent.model.Point(6, 40, 'l2 Label-Text 4', 11),
                            new exxcellent.model.Point(7, 90, 'l2 Label-Text 5', 12),
                            new exxcellent.model.Point(8, 15, 'l2 Label-Text 6', 13),
                            new exxcellent.model.Point(11, 50, 'l2 Label-Text 7', 14)
                    ),
                    "line2",
                    "Label Line2",
                    "red",
                    "red",
                    "bezier"
            )
        );

        // return the whole thing
        return new Object({
            lineChartModel:new exxcellent.model.LineChartModel(lines)
        });
    },
    /**
     * Creates a LineChartModel
     */
    _createLineChartModel_2: function() {
        // the sectors
        var points = new Array(
                new exxcellent.model.Point(0, 50, 'Punkt 0/50', 1),
                new exxcellent.model.Point(20, 80, 'Punkt 20/80', 2),
                new exxcellent.model.Point(70, 70, 'Punkt 70/70', 3),
                new exxcellent.model.Point(100, 70, 'Punkt 100/70', 4)
                );

        // return the whole thing
        return new Object({
            lineChartModel:new exxcellent.model.LineChartModel(new Array(new exxcellent.model.Line(points)))
        });
    },
    /**
     * Creates a LineChartModel
     */
    _createLineChartModel_3: function() {
        // the sectors
        var points = new Array(
                new exxcellent.model.Point(0, 20, '0/20', 1),
                new exxcellent.model.Point(10, 80, '10/80', 2),
                new exxcellent.model.Point(25, 30, '25/30', 3),
                new exxcellent.model.Point(35, 50, '35/50', 4),
                new exxcellent.model.Point(45, 20, '45/20', 5),
                new exxcellent.model.Point(48, 30, '48/30', 6),
                new exxcellent.model.Point(55, 70, '55/70', 7),
                new exxcellent.model.Point(60, 30, '60/30', 8),
                new exxcellent.model.Point(70, 10, '70/10', 8),
                new exxcellent.model.Point(90, 25, '90/25', 9),
                new exxcellent.model.Point(100, 0, '100/0', 10)
                );

        // return the whole thing
        return new Object({
            lineChartModel:new exxcellent.model.LineChartModel(new Array(new exxcellent.model.Line(points)))
        });
    },

    /**
     * Creates a LineChartModel
     */
    _createAxisModel_1: function() {
        // the sectors
        var xAxisValues = new Array(
                'xTest 1',
                'xTest 2',
                'xTest 3',
                'xTest 4'
                );
        var yAxisValues = new Array(
                'yTest 1',
                'yTest 2',
                'yTest 3'
                );

        // return the whole thing
        return new Object({
            axisModel:new exxcellent.model.AxisModel(xAxisValues, null, yAxisValues, null)
        });
    },

    /**
     * Creates a LineChartModel
     */
    _createAxisModel_2: function() {
        // the sectors
        var xAxisValues = new Array(
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11
        );
        var xAxisLabels = new Array('Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
                'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.');
        var yAxisValues = new Array(
                10,
                20,
                50,
                100
        );
        var yAxisLabels = new Array(
                '10',
                '20',
                '50',
                '100'
        );

        // return the whole thing
        return new Object({
            axisModel:new exxcellent.model.AxisModel(xAxisValues, xAxisLabels, yAxisValues, yAxisLabels)
        });
    },

    _createButton: function(text, action) {
        return new Echo.Button({
            text: text,
            styleName: "Default",
            events: {
                action: Core.method(this, action)
            }
        });
    }
});