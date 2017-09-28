import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { D3Service, D3, Selection, ScaleTime } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface
import { ITicker, Ticker } from './watchList';

@Component({
    selector: 'ticker-chart',
    templateUrl: './tickerChart.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tickerChart.component.css']
})
export class TickerChartComponent implements OnInit {

    //@Input() priceDirection: number;

    // TODO:
    // 01. Put the chart in its own component
    // 02. Put the CSS for the chart in its own file and use ViewEncapsulation.None

    @Input() ticker: Ticker;
    private d3: D3; // <-- Define the private member which will hold the d3 reference

    constructor(d3Service: D3Service) { 
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    }

    ngOnInit() {
        this.go();
     }



    go(): void {

        var dataset = [
            { dateString: "2016-01-01", number: 24.0, date: null },
            { dateString: "2016-01-02", number: 24.1, date: null },
            { dateString: "2016-01-03", number: 23.9, date: null },
            { dateString: "2016-01-04", number: 24.0, date: null },
            { dateString: "2016-01-05", number: 24.0, date: null },
            { dateString: "2016-01-06", number: 24.0, date: null },
            { dateString: "2016-01-07", number: 24.1, date: null },
            { dateString: "2016-01-08", number: 24.2, date: null },
            { dateString: "2016-01-09", number: 24.3, date: null },
            { dateString: "2016-01-10", number: 24.4, date: null },
            { dateString: "2016-01-11", number: 24.3, date: null },
            { dateString: "2016-01-12", number: 24.2, date: null },
            { dateString: "2016-01-13", number: 24.2, date: null },
            { dateString: "2016-01-14", number: 24.3, date: null },
            { dateString: "2016-01-15", number: 24.4, date: null },
            { dateString: "2016-01-16", number: 24.5, date: null },
            { dateString: "2016-01-17", number: 24.5, date: null },
            { dateString: "2016-01-18", number: 24.6, date: null },
            { dateString: "2016-01-19", number: 24.5, date: null },
            { dateString: "2016-01-20", number: 24.3, date: null },
            { dateString: "2016-01-21", number: 24.1, date: null },
            { dateString: "2016-01-22", number: 23.9, date: null },
            { dateString: "2016-01-23", number: 23.9, date: null },
            { dateString: "2016-01-24", number: 24.0, date: null },
            { dateString: "2016-01-25", number: 24.1, date: null },
            { dateString: "2016-01-26", number: 24.2, date: null },
            { dateString: "2016-01-27", number: 24.1, date: null }
        ];

        // var dataset2 = [
        //     { time: 0, number: 24.0},
        //     { time: 1, number: 24.1},
        //     { time: 2, number: 23.9},
        //     { time: 3, number: 24.0},
        //     { time: 4, number: 24.0},
        //     { time: 5, number: 24.0},
        //     { time: 6, number: 24.1},
        //     { time: 7, number: 24.2},
        //     { time: 8, number: 24.3},
        //     { time: 9, number: 24.4},
        //     { time: 10, number: 24.3},
        //     { time: 11, number: 24.2},
        //     { time: 12, number: 24.2},
        //     { time: 13, number: 24.3},
        //     { time: 14, number: 24.4},
        //     { time: 15, number: 24.5},
        //     { time: 16, number: 24.5},
        //     { time: 17, number: 24.6},
        //     { time: 18, number: 24.5},
        //     { time: 19, number: 24.3},
        //     { time: 20, number: 24.1},
        //     { time: 21, number: 23.9},
        //     { time: 22, number: 23.9},
        //     { time: 23, number: 24.0},
        //     { time: 24, number: 24.1},
        //     { time: 25, number: 24.2},
        //     { time: 26, number: 24.1}
        // ];




        //Parse the date
        var parseDate = this.d3.timeParse("%Y-%m-%d");
        dataset.forEach(function (d) {
            d.date = parseDate(d.dateString);
        });

        ///////////////////////////////////////////////////
        //////////////// Set the Scales ///////////////////
        ///////////////////////////////////////////////////
        //Set the dimensions of the chart
        var margin = { top: 20, right: 70, bottom: 20, left: 10 },
            width = 700 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        //Set the x and y scale ranges
        var xScale = this.d3.scaleTime()
            .domain(this.d3.extent(dataset, function (d) { return d.date; }))
            .range([0, width]);

        //.domain([23.8, d3.max(dataset, function(d) { return d.number; }) * 1.1]) 
        var yScale = this.d3.scaleLinear()
            .domain([23.8, 24.6])
            .range([height, 0]);


        //Define the axes
        var xAxis = this.d3.axisBottom(xScale).ticks(6);
        var yAxis = this.d3.axisRight(yScale).ticks(10);

        //Initiate the line function
        var lineFunction = this.d3.line<any>()
            .curve(this.d3.curveMonotoneX)
            .x(function (d) { return xScale(d.date); })
            .y(function (d) { return yScale(d.number); });
        // //Initiate the area line function
        var areaFunction = this.d3.area<any>()
            .curve(this.d3.curveMonotoneX)
            .x(function (d) { return xScale(d.date); })
            .y0(height)
            .y1(function (d) { return yScale(d.number); });
        ///////////////////////////////////////////////////
        ////////////// Initialize the SVG /////////////////
        ///////////////////////////////////////////////////

        //Add the svg canvas for the line chart
        var svg = this.d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        ///////////////////////////////////////////////////
        ///////////// Create the gradient /////////////////
        ///////////////////////////////////////////////////

        //Define the gradient below the line chart
        var areaGradient = svg.append('defs')
            .append("linearGradient")
            .attr('id', 'areaGradient')
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "0%").attr("y2", "100%");

        //Append the first stop - the color at the top                  
        areaGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#05AFEC")
            .attr("stop-opacity", 0.6);
        //Append the second stop - white transparant almost at the end		
        areaGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 0);
        ///////////////////////////////////////////////////
        /////////////// Create the chart //////////////////
        ///////////////////////////////////////////////////

        //Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        //Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + " ,0)")
            .call(yAxis);


        svg.append("text").text(this.ticker.id);
        //         svg.append("g")				
        // .attr("class", "y axis")	

        // .style("fill", "red")		
        // .call(yAxisRight);

        //Draw the underlying area chart filled with the gradient
        svg.append("path")
            .attr("class", "area")
            .style("fill", "url(#areaGradient)")
            .attr("d", areaFunction(dataset));
        // //Draw the line
        //this.d3.line<number,number>(dataset2);
        svg.append("path")
            .attr("class", "line")
            .attr("d", lineFunction(dataset));

        // svg.selectAll(".lineDots")
        //   .data(dataset, function(d) { return d.date; })
        //   .enter().append("circle")
        //   .attr("class", "lineDots")
        //   .attr("r", 3)
        //   .attr("cx", function(d) { return xScale(d.date); } )
        //   .attr("cy", function(d) { return yScale(d.number); } );




    }












    //  //Set the dimensions of the chart
    //  var margin = {top: 20, right: 70, bottom: 20, left: 10},
    //      width = 700 - margin.left - margin.right,
    //      height = 200 - margin.top - margin.bottom;
    //  //Set the x and y scale ranges
    //  var xScale = this.d3.scaleTime()
    //      .domain(this.d3.extent(dataset, function(d) { return d.date; }))
    //      .range([0, width]);

    //.domain([23.8, d3.max(dataset, function(d) { return d.number; }) * 1.1]) 
    //     var yScale = this.d3.scaleLinear()
    //         .domain([23.8, 24.6])
    //         .range([height, 0]);
    //     //Define the axes
    //     var xAxis = this.d3.axisBottom(xScale).ticks(6);
    //     var yAxis = this.d3.axisRight(yScale).ticks(10);

    //     //Initiate the line function
    //     var lineFunction = this.d3.line()
    //         //.interpolate("monotone")
    //         .x(function(d) { return xScale(d.date); })
    //         .y(function(d) { return yScale(d.number); });
    //     //Initiate the area line function
    //     var areaFunction = this.d3.area()
    //         //.interpolate("monotone")
    //         .x(function(d) { return xScale(d.date); })
    //         .y0(height)
    //         .y1(function(d) { return yScale(d.number); });
    //     ///////////////////////////////////////////////////
    //     ////////////// Initialize the SVG /////////////////
    //     ///////////////////////////////////////////////////

    //     //Add the svg canvas for the line chart
    //     var svg = this.d3.select("#chart")
    //         .append("svg")
    //             .attr("width", width + margin.left + margin.right)
    //             .attr("height", height + margin.top + margin.bottom)
    //         .append("g")
    //             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //     ///////////////////////////////////////////////////
    //     ///////////// Create the gradient /////////////////
    //     ///////////////////////////////////////////////////

    //     //Define the gradient below the line chart
    //     var areaGradient = svg.append('defs')
    //             .append("linearGradient")                
    //             .attr('id','areaGradient')
    //             .attr("x1", "0%").attr("y1", "0%")
    //             .attr("x2", "0%").attr("y2", "100%");

    //     //Append the first stop - the color at the top                  
    //     areaGradient.append("stop")         
    //             .attr("offset", "0%")   
    //             .attr("stop-color", "#05AFEC")
    //             .attr("stop-opacity", 0.6); 
    //     //Append the second stop - white transparant almost at the end		
    //     areaGradient.append("stop")         
    //             .attr("offset", "95%")   
    //             .attr("stop-color", "white")
    //             .attr("stop-opacity", 0); 
    //     ///////////////////////////////////////////////////
    //     /////////////// Create the chart //////////////////
    //     ///////////////////////////////////////////////////

    //     //Add the X Axis
    //     svg.append("g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0," + height + ")")
    //         .call(xAxis);
    //     //Add the Y Axis
    //     svg.append("g")
    //         .attr("class", "y axis")
    //         .attr("transform", "translate(" + width + " ,0)")	
    //         .call(yAxis);

    // //         svg.append("g")				
    // // .attr("class", "y axis")	

    // // .style("fill", "red")		
    // // .call(yAxisRight);

    //     //Draw the underlying area chart filled with the gradient
    //     svg.append("path")
    //         .attr("class", "area")
    //         .style("fill", "url(#areaGradient)")
    //         .attr("d", areaFunction(dataset));
    //     //Draw the line
    //     svg.append("path")
    //         .attr("class", "line")
    //         .attr("d", lineFunction(dataset));

    //     svg.selectAll(".lineDots")
    //         //.data(dataset, function(d) { return d.date; })
    //         .data(dataset, function(d) { return d; })
    //         .enter().append("circle")
    //         .attr("class", "lineDots")
    //         .attr("r", 3)
    //         .attr("cx", function(d) { return xScale(d.date); } )
    //         .attr("cy", function(d) { return yScale(d.number); } );


    //     }


}
