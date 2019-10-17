function update(data, n, best, playername, country) {
  
  let text = svg2.selectAll("text");
  text.remove();

  var pie = d3
    .pie()
    .value(function(d) {
      return d.value;
    })
    .sort(function(a, b) {
      console.log(a);
      return d3.ascending(a.key, b.key);
    }); // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data));

  var u = svg2.selectAll("path").data(data_ready);

  u.enter()
    .append("path")
    .attr("class", "pieslice")
    .merge(u)
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

  let str;
  let x1;
  let x2;
  let y1;
  let y2;
  if (n === 1) {
    str = ["Wins", "Losses"];
    x1 = 60;
    y1 = 0;
    x2 = -120;
    y2 = 0;
  } else {
    str = ["Yes", "No"];
    x1 = 10;
    y1 = -130;
    x2 = -130;
    y2 = 50;
  }

  svg2.data([data_ready[0]]);
  svg2
    .append("text")
    .attr("class", "text")
    .attr("x", x1)
    .attr("y", y1)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .text(function(d) {
      let num = d.value + " " + str[0];
      return num;
    });

  svg2.data([data_ready[1]]);
  svg2
    .append("text")
    .attr("class", "text")
    .attr("x", x2)
    .attr("y", y2)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .text(function(d) {
      let num = d.value + " " + str[1];
      return num;
    });
    
  svg2.data([best]);
  svg2
    .append("text")
    .attr("class", "text")
    .attr("x", -60)
    .attr("y", 220)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .text(function(d) {
      
      let num = "Best trophies: " + d;
      return num;
    });

    svg2.data([playername]);
    svg2
      .append("text")
      .attr("class", "text")
      .attr("x", -70)
      .attr("y", -210)
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .text(function(d) {
        let num = "Player name: " + d;
        return num;
      });

     svg2.data([country]);
     svg2
       .append("text")
       .attr("class", "text")
       .attr("x", -45)
       .attr("y", -190)
       .attr("font-family", "sans-serif")
       .attr("font-size", 12)
       .text(function(d) {
         let num = "Country: " + d;
         return num;
       });
  u.exit().remove();
}
