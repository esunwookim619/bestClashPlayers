
    const width = 400;
    const height = 370;
    const config = {
      speed: 0.02,
      verticalTilt: -30,
      horizontalTilt: 0
    }
    let locations = [];
    const svg = d3.select('.globe')
      .attr('width', width).attr('height', height);
    const markerGroup = svg.append('g');
    const projection = d3.geoOrthographic();
    const initialScale = projection.scale(180).translate([180, 180]);
    const path = d3.geoPath().projection(projection);
    const center = [width / 2, height / 2];

    drawGlobe();
    drawGraticule();
    // enableRotation();

    function drawGlobe() {
      d3.queue()
        .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
        .defer(d3.json, './locations.json')
        .await((error, worldData, locationData) => {
          svg
            .selectAll(".segment")
            .data(
              topojson.feature(worldData, worldData.objects.countries).features
            )
            .enter()
            .append("path")
            .attr("class", "segment")
            .attr("d", path)
            // .style("stroke", "#888")
            .style("stroke", "black")
            .style("stroke-width", ".5px")
            // .style("fill", (d, i) => '#e5e5e5')
            .style("fill", (d, i) => "#d09b69")
            .style("opacity", "1");
          locations = locationData;
          drawMarkers();
        });
    }

    function drawGraticule() {
      const graticule = d3.geoGraticule()
        // .step([10, 10]);
        .step([.3, 0]);

      svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        // .style("fill", "#fff")
        .style("fill", "steelblue")
        // .style("stroke", "#ccc");
        .style("stroke", "steelblue")
    }

    function enableRotation() {
      d3.timer(function (elapsed) {
        projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt]);
        svg.selectAll("path").attr("d", path);
        drawMarkers();
      });
    }

    function drawMarkers() {
      const markers = markerGroup.selectAll('circle')
        .data(locations);
      markers
        .enter()
        .append('circle')
        .merge(markers)
        .attr('cx', d => projection([d.longitude, d.latitude])[0])
        .attr('cy', d => projection([d.longitude, d.latitude])[1])
        .attr('fill', d => {
          const coordinate = [d.longitude, d.latitude];
          gdistance = d3.geoDistance(coordinate, projection.invert(center));
          return gdistance > 1.57 ? 'none' : 'red';
        })
        .attr('r', 4) //control size of markers
        .attr("class", "player")
        .on("click", handleClick);

      markerGroup.each(function () {
        this.parentNode.appendChild(this);
      });
    }

    function handleClick(d, i) {
      
      d3.select(this).attr("fill", d => {
        const coordinate = [d.longitude, d.latitude];
        gdistance = d3.geoDistance(coordinate, projection.invert(center));
        return gdistance > 1.57 ? "none" : "yellow";
      });

      // const body = d3.select("body");
      // body.append("div").attr("width", 50)
      //   .attr("height", 50);
      d3.selectAll(".data").attr("class", "invis");
    }
  

