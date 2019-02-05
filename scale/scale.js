document.addEventListener('DOMContentLoaded', init);

var numPoints = 10;
var minValue = 10;
var maxValue = 200;

let parseTime = d3.timeParse("%d/%m/%Y");
let formatTime = d3.timeFormat("%b %e");

let rowConverter = (d) => {
    return {
        Date: parseTime(d.Date),
        Amount: parseInt(d.Amount),
    };
};

function init() {
   d3.csv("data.csv", rowConverter).then((data, error) => {
       if(error) {
           console.log(error);
       } else {
           drawScatter(data);
       }
   });
}

function drawScatter(dataset) {
    let xMin = d3.min(dataset, (d) => d.Date);
    let xMax = d3.max(dataset, (d) => d.Date);
    let yMax = d3.max(dataset, (d) => d.Amount);
    let width = 500;
    let height = 200;
    let padding = 60;

    let xScale = d3.scaleTime()
        .domain([xMin, xMax])
        .range([padding, width - padding]);
        console.log(xScale);

    let yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - padding, padding]);

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
            return xScale(d.Date);
        })
        .attr("cy", (d) => {
            return yScale(d.Amount);
        })
        .attr("r", 3)
        .attr("fill", "black");

    // create the labels
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text((d) => {
            return formatTime(d.Date) + " - $" + d.Amount
        })
        .attr("x", (d) => {
            return xScale(d.Date);
        })
        .attr("y", (d) => {
            return yScale(d.Amount);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");
}
