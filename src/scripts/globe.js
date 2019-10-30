    const width = 400;
    const height = 370;
    let markercolor = "#a3262d";
    const config = {
      speed: 0.01,
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
            .style("stroke", "black")
            .style("stroke-width", ".5px")
            .style("fill", (d, i) => "#d09b69")
            .style("opacity", "1");
          locations = locationData;
          drawMarkers();
        });
    }

    function drawGraticule() {
      const graticule = d3.geoGraticule()
        .step([.3, 0]);

      svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "steelblue")
        .style("stroke", "steelblue")
    }

    // function enableRotation() {
    // }

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
          return gdistance > 1.57 ? "none" : markercolor;
        })
        .attr('r', 5) //control size of markers
        .attr("class", "player")
        .on("mouseenter", handleHover);

      markerGroup.each(function () {
        this.parentNode.appendChild(this);
      });
    }

    function handleHover(d, i) { 
      data1 = { a: d.wins, b: d.losses };
      data2 = { a: d.threeCrownWins, b: d.battleCount }
      best = d.bestTrophies;
      playername = d.name;
      country = d.country;
      update(data1, 1, best, playername, country);
      d3.selectAll(".invis").attr("class", "datacontainer");
    }
  
    let totalElapsedTime = 0;
    let startTime = d3.now() - totalElapsedTime;
    let t = d3.timer(function(elapsed) {
      let elapsedTime = d3.now() - startTime;
      projection.rotate([
        config.speed * elapsedTime - 120,
        config.verticalTilt,
        config.horizontalTilt
      ]);
      svg.selectAll("path").attr("d", path);
      drawMarkers();
    });

    function stop() {
      totalElapsedTime = d3.now() - startTime;
      t.stop();
    }

    function restart() {
      startTime = d3.now() - totalElapsedTime;
      t.restart(function(elapsed) {
        let elapsedTime = d3.now() - startTime;
        projection.rotate([
          config.speed * elapsedTime - 120,
          config.verticalTilt,
          config.horizontalTilt
        ]);
        svg.selectAll("path").attr("d", path);
        drawMarkers();
      });
    }

