
// Add an event handler for when the window loads.
window.addEventListener("load", eventWindowLoaded, false);

// The debugger function is very useful for debugging java script. Support by Chrome and Firefox (with firebug). Unfortunately it is not supported by IE.
var Debugger = function () { };

// Debugger function swallows execptions for IE - so we do not crash!
Debugger.log = function (message) {
    try {
        console.log(message);
    }
    catch (exception) {
        return;
    }
}

// When the window has loaded, set the top panel text and then call the canvasApp() function which is the main drawing procedure
function eventWindowLoaded() {
    window.canvasApp = canvasApp;
    //canvasApp();
    //$("#footer").css('visibility', 'visible');
}

// Determines if the browser supports the html5 canvas tag (uses Modernizr.js).
function canvasSupport() {
    // return Modernizr.canvas;
    return true;
}

// Main procedure for drawing the tournament wheel
function d3MapApp() {
    

    console.log('d3MapApp is running');



    var width = 960,
    height = 1160;

var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1200 * 5)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

 
var svg = d3.select("#mapDiv").append("svg")
    .attr("width", width)
    .attr("height", height);

    d3.json("assets/js/uk.json", function (error, uk) {
    
        console.log('d3 json load called?')
    
  var subunits = topojson.feature(uk, uk.objects.subunits),
      places = topojson.feature(uk, uk.objects.places);

  svg.selectAll(".subunit")
      .data(subunits.features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary");

  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary IRL");

  svg.selectAll(".subunit-label")
      .data(subunits.features)
    .enter().append("text")
      .attr("class", function(d) { return "subunit-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });

  svg.append("path")
      .datum(places)
      .attr("d", path)
      .attr("class", "place");

  svg.selectAll(".place-label")
      .data(places.features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
      .text(function (d) { return d.properties.name; });
    
    console.log('is d3 called?')
});


}; // end of canvasApp
