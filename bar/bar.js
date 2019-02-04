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

function init() {
    drawBarSvg(generateNumbers(25, 20, 100));
}

function drawBarSvg(dataset) {
    let svgWidth = 500;
    let svgHeight = 100;
    let barPadding = 1;

    let svg = d3.select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

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
            let c = lerpRGB(color1, color2, d, 0, 100);
            return "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
        });

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