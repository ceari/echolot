/**
 * Raphael-Plugin to draw a lineChart
 * Inspired from: http://raphaeljs.com/analytics.html
 *
 * You have to make sure, that the following scripts are already loaded:
 * <code>exx.raphael.js - Version 1.0</code>
 * You might use a higher Version of these files, but without any warranty!
 *
 * @author Ralf Enderle
 */

/**
 * Will draw a lineChart
 * @param lineChartModel - exxcellent.model.LineChartModel
 * @param lineChartLayout - exxcellent.model.LineChartLayout
 */
Raphael.fn.exx.linechart = function(lineChartModel, lineChartLayout, axisModel, callback) {
    var xOffset = 30;
    var yOffset = 10;
    // the master contains everything
    //var master = this.set();
    // first of all we draw the grid, if it is configured
    if (lineChartLayout.isDrawGrid()) {
        this.exx.drawGrid(xOffset, yOffset, lineChartLayout, axisModel);
    }

    var pathArray = [];
    for (var j = 0; j < lineChartModel.lines.length; j++) {
        var line = lineChartModel.lines[j];
        var pointArray = [];
        for (var i = 0; i < line.points.length; i++) {
            var point = new Object();
            point.x = line.points[i].xValue;
            point.y = line.points[i].yValue;
            point.label = line.points[i].label;
            point.identifier = line.points[i].identifier;
            pointArray = pointArray.concat(point);
        }

        line = this.exx.drawLine(xOffset, yOffset, pointArray, line, lineChartLayout, callback);

        if (lineChartLayout.isFillDifference() && lineChartModel.lines.length > 1) {
            // Fill the area between the two first lines
            if (j == 0) {
                pathArray = pathArray.concat(line.pathArray.slice(4));
            } else if (j == 1) {
                var pa = line.pathArray.slice(4);
                pathArray = pathArray.concat([pa[pa.length-2], pa[pa.length-1], pa[pa.length-2], pa[pa.length-1]]);
                for (var i = pa.length - 2; i >= 0; i -= 2) {
                    pathArray = pathArray.concat(pa.slice(i, i+2));
                }
                pathArray = pathArray.concat([pa[0], pa[1], pathArray[0], pathArray[1], pathArray[0], pathArray[1]])
            }
        }
    }

    if (lineChartLayout.isFillDifference() && lineChartModel.lines.length > 1) {
        // Fill the area between the two first lines
        pathArray = ["M", pathArray[0], pathArray[1], "C"].concat(pathArray)
        var differencePath = this.path().attr({stroke: "none", opacity: .3, fill: lineChartLayout.getFillDifferenceColor()});
        differencePath.attr({path: pathArray}).toBack();
    }


    //return master;
};

