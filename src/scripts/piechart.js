// set the dimensions and margins of the graph
const width2 = 450;
const height2 = 450;
const margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width2, height2) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select(".data")
  .append("svg")
    .attr("class", "pie")
    .attr("width", width2)
    .attr("height", height2)
  .append("g")
    .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");

// create 2 data_set
// var data1 = {a: 9, b: 20, c:30, d:8, e:12}
var data1 = {a: 50, b: 20}
// var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
var data2= {a: 54.7, b: 45.3}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f"])
  .range(d3.schemeDark2);

// A function that create / update the plot for a given variable:
function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg2.selectAll("path")
    .data(data_ready)
    
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  
  u.enter()
    .append("path")
    .attr("class", "pieslice")
    .merge(u)
    .transition()
    .duration(1000)
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
    )
    .attr("fill", function(d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  // remove the group that is not present anymore
  u
    .exit()
    .remove()

}

// Initialize the plot with the first dataset
update(data1)
