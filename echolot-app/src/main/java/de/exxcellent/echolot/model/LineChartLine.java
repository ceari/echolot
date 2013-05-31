/*
 * This file (LineChartPoint.java) is part of the Echolot Project (hereinafter "Echolot").
 * Copyright (C) 2008-2010 eXXcellent Solutions GmbH.
 *
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 */

package de.exxcellent.echolot.model;

import nextapp.echo.app.ApplicationInstance;
import nextapp.echo.app.Color;
import nextapp.echo.app.serial.SerialException;
import nextapp.echo.app.serial.property.ColorPeer;

import java.io.Serializable;

/**
 * Object that represents a line on the LineChart
 *
 * @author Daniel Diepold
 * @version 1.0
 */
public class LineChartLine implements Serializable {

    private final LineChartPoint[] points;

    private final String identifier;
    private final String label;
    private final String lineColor;
    private final String dotColor;
    private final String interpolation;

    /**
     * UserObject to identify the Line by the user
     */
    private final transient Object userObject;

    /**
     * Constructor
     *
     * @param points - the points
     */
    public LineChartLine(final LineChartPoint[] points) {
        this(points, null);
    }

    /**
     * Constructor
     *
     * @param points - the points
     * @param label  - the label of the line
     */
    public LineChartLine(final LineChartPoint[] points, final String label) {
        this(points, label, null, null, null, null);
    }

    /**
     * Constructor
     *
     * @param points        - the points
     * @param label         - the label of the point
     * @param lineColor     - the color used to draw the line
     * @param dotColor      - the color used to draw the points on the line
     * @param interpolation - the interpolation to use for this line
     */
    public LineChartLine(final LineChartPoint[] points, final String label, final Color lineColor, final Color dotColor, final Interpolation interpolation) {
        this(points, label, lineColor, dotColor, interpolation, null);
    }

    /**
     * Constructor
     *
     * @param points        - the points
     * @param label         - the label of the point
     * @param lineColor     - the color used to draw the line
     * @param dotColor      - the color used to draw the points on the line
     * @param interpolation - the interpolation to use for this line
     * @param userObject - associated userObject
     */
    public LineChartLine(final LineChartPoint[] points, final String label, final Color lineColor,
                         final Color dotColor, final Interpolation interpolation, final Object userObject) {
        this.points = points;
        this.label = label;
        this.lineColor = convertColor(lineColor);
        this.dotColor = convertColor(dotColor);
        this.interpolation = interpolation == null ? null : interpolation.getInterpolationValue();
        this.userObject = userObject;

        // and at least the identifier (we will use the built-in echo feature to generate a unique identifier)
        this.identifier = ApplicationInstance.getActive().generateId();
    }

    public LineChartPoint[] getPoints() {
        return points;
    }

    public Interpolation getInterpolation() {
        return Interpolation.toInterpolation(this.interpolation);
    }

    /**
     * Returns the label
     *
     * @return - the label
     */
    public String getLabel() {
        return label;
    }

    /**
     * Returns the identifier
     *
     * @return - the echo unique identifier
     */
    public String getIdentifier() {
        return identifier;
    }

    /**
     * Returns the UserObject
     *
     * @return - the associated userObject
     */
    public Object getUserObject() {
        return userObject;
    }

    /**
     * Returns the color of the line
     *
     * @return
     */
    public Color getLineColor() {
        try {
            return ColorPeer.fromString(this.lineColor);
        } catch (SerialException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Returns the color of the points on the line
     *
     * @return
     */
    public Color getDotColor() {
        try {
            return ColorPeer.fromString(this.dotColor);
        } catch (SerialException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Internal helper
     *
     * @param color
     * @return
     */
    private static String convertColor(Color color) {
        try {
            if (color != null) {
                return ColorPeer.toString(color);
            }
        } catch (SerialException e) {
            // we will do nothing at all
            // just return #000000
        }
        return "#000000";
    }
}
