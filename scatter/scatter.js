document.addEventListener('DOMContentLoaded', init);

var numPoints = 10;
var minValue = 10;
var maxValue = 200;

function init() {
    drawScatter(generatePoints(numPoints, minValue, maxValue));
}

function drawScatter(dataset) {

    let margin = 40;
    let width = maxValue + margin;
    let height = maxValue + margin;

    // create the svg element
    let svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    // create the points
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (d) => {
            return d[0];
        })
        .attr("cy", (d) => {
            return height - d[1];
        })
        .attr("r", 3)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "black");

    // create the labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) => {
            return d[0] + "," + d[1]
        })
        .attr("x", (d) => {
            return d[0];
        })
        .attr("y", (d) => {
            return height - d[1];
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");
}