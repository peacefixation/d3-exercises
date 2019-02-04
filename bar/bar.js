document.addEventListener('DOMContentLoaded', init);

var color1 = {
    r: 0,
    g: 0,
    b: 255,
};

var color2 = {
    r: 0,
    g: 150,
    b: 200,
};

var numBars = 25;
var minValue = 20;
var maxValue = 100;

function init() {
    drawBarSvg(generateNumbers(numBars, minValue, maxValue));
}

function drawBarSvg(dataset) {
    let svgWidth = 500;
    let svgHeight = maxValue;
    let barPadding = 1;

    // create the SVG element
    let svg = d3.select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    // create the bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return i  * (svgWidth / dataset.length);
        })
        .attr("y", (d) => {
            return svgHeight - d;
        })
        .attr("width", svgWidth / dataset.length - barPadding)
        .attr("height", (d) => {
            return d;
        })
        .attr("fill", (d) => {
            let c = lerpRGB(color1, color2, d, minValue, maxValue);
            return "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
        });

    // create the labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) => {
            return Math.round(d);
        })
        .attr("x", (d, i) => {
            return i * (svgWidth / dataset.length) + (svgWidth / dataset.length) / 2 - barPadding;
        })
        .attr("y", (d) => {
            return svgHeight - d + 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
}