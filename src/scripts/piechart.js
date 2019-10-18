// set the dimensions and margins of the graph
const width2 = 450;
const height2 = 450;
const margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width2, height2) / 2 - margin;

var svg2 = d3.select(".data")
  .append("svg")
    .attr("class", "pie")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b"])
  .range(d3.schemeSet1);

// Initialize the plot with the first dataset
update(data1, 1, best, playername, country)

