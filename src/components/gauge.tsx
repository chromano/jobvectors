"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Gauge = ({ perc }: { perc: number }) => {
    const ref = useRef<SVGSVGElement>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        const container = svgElement.node()?.parentNode as HTMLElement;
        if (!container) return;
        const width = container.offsetWidth;
        const height = width * 1;
        const radius = Math.min(width, height) / 2;
        const gaugeValue = Math.round(perc * 100);

        svgElement.attr("width", width).attr("height", radius);

        const svg = svgElement
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Gradient from less vibrant colors
        const gradient = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "gaugeGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", -radius)
            .attr("y1", 0)
            .attr("x2", radius)
            .attr("y2", 0);

        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ff9999"); // light red
        gradient.append("stop").attr("offset", "50%").attr("stop-color", "#ffff99"); // light yellow
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#99ff99"); // light green

        const arc = d3
            .arc()
            .innerRadius(radius * 0.7) // Thicker arc
            .outerRadius(radius)
            .startAngle((-Math.PI / 2) * 0.8)
            .endAngle((Math.PI / 2) * 0.8)
            .cornerRadius(radius * 0.1); // Add corner radius

        svg.append("path")
            .datum({
                startAngle: -Math.PI / 2 + value * Math.PI + 0.03,
                endAngle: -Math.PI / 2 + 100 * Math.PI - 0.03,
            })
            .style("fill", "url(#gaugeGradient)")
            .style("stroke", "black") // Add black border
            .style("stroke-width", "1px") // Border width
            .attr("d", arc as d3.Arc<any, any>);

        // Animate needle
        const needle = svg
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -radius * 0.7)
            .attr("stroke", "#666")
            .attr("stroke-width", 2)
            .attr("transform", `translate(0, -10) rotate(-90)`);

        needle
            .transition()
            .duration(1000)
            .attr("transform", `translate(0, -10) rotate(${(gaugeValue / 100) * 180 - 90})`);

        // Center dot
        svg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 4)
            .attr("fill", "#999")
            .attr("transform", `translate(0, -10)`);

        // Set the value directly without animation
        setValue(gaugeValue);

        return () => {
            d3.select(ref.current).selectAll("*").remove();
        };
    }, [perc]);

    return (
        <div className="flex flex-col items-center">
            <svg ref={ref} style={{ width: "100%", height: "auto" }}></svg>
            <div className="text-2xl oldstyle-nums">{value}%</div>
        </div>
    );
};

export default Gauge;
