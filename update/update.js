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
var initialMaxValue = 100;
let padding = 30;

let svgWidth = 500;
let svgHeight = 200;

let labelFontSize = 8;

let dataset = generateNumbers(numBars, minValue, initialMaxValue);

let xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, svgWidth - padding])
    .paddingInner(0.05);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight - padding, padding]);

let xAxis = d3.axisBottom()
    .scale(xScale);

let yAxis = d3.axisLeft()
    .scale(yScale);

function init() {
    d3.select("button")
        .on("click", (e) => {
            let newMaxValue = Math.random() * 1000;
            updateBarSvg(generateNumbers(numBars, minValue, newMaxValue));
        });

    drawBarSvg(dataset);
}

function drawBarSvg(dataset) {
    let maxValue =  d3.max(dataset);

    // create the SVG element
    let svg = d3.select("#graph")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    // create the bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return xScale(i)
        })
        .attr("y", (d) => { // y-coord
            //return svgHeight - yScale(d) - padding;
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(0) - yScale(d)) // height
        .attr("fill", (d) => {
            let c = lerpRGB(color1, color2, yScale(d), minValue, maxValue);
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
            return xScale(i) + xScale.bandwidth() / 2 - 1;
        })
        .attr("y", (d) => {
            return yScale(d) + 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", labelFontSize + "px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (svgHeight - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);
}

function updateBarSvg(dataset) {
    let maxValue = d3.max(dataset)

    yScale.domain([0, d3.max(dataset)]); // rescale the y domain

    let svg = d3.select("svg");

    // update the bars
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(500)
        .delay((d, i) => i / dataset.length * 1000)
        // .ease(d3.easeLinear)
        .attr("x", (d, i) => {
            return xScale(i)
        })
        .attr("y", (d) => {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(0) - yScale(d))
        .attr("fill", (d) => {
            let c = lerpRGB(color1, color2, d, minValue, maxValue);
            return "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
        });

    // update the labels
    svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(500)
        .delay((d, i) => i / dataset.length * 1000)
        // .ease(d3.easeLinear)
        .text((d) => {
            return Math.round(d);
        })
        .attr("x", (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2 - 1;
        })
        .attr("y", (d) => {
            return yScale(d) + 10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", labelFontSize + "px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");

    // update the axes
    svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);
}