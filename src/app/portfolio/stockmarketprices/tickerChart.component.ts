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

    private _ticker: Ticker;
    private d3: D3; // <-- Define the private member which will hold the d3 reference

    @Input() set ticker(value: Ticker) {
        this._ticker = value;
        this.displayChart();
    }
    get ticker(): Ticker {
        return this._ticker;
    }

    constructor(d3Service: D3Service) {
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    }

    ngOnInit() {
        this.displayChart();
    }

    displayChart(): void {

        this.d3.select("#chart").selectAll("*").remove();

        var dataset = this.ticker.intradayPrices;


        //Parse the date
        var parseDate = this.d3.timeParse("%H:%M");
        dataset.forEach(function (d) {
            d.date = parseDate(d.dateString);
        });

        ///////////////////////////////////////////////////
        //////////////// Set the Scales ///////////////////
        ///////////////////////////////////////////////////
        //Set the dimensions of the chart
        var margin = { top: 20, right: 50, bottom: 20, left: 40 },
            width = 700 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        //Set the x and y scale ranges
        var xScale = this.d3.scaleTime()
            .domain(this.d3.extent(dataset, function (d) { return d.date; }))
            .range([0, width]);

            var yScale = this.d3.scaleLinear()
            .domain(this.d3.extent(dataset, function (d) { return d.number; }))
            .range([height, 0])
            .nice();


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

        //Add the X Axis
        var xNode = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        xNode.select('path').style("stroke", "#C4C4C4").style("fill", "none");
        xNode.selectAll('text').style("fill", "#C4C4C4");
        //Add the Y Axis
        var yNode = svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + " ,0)")
            .call(yAxis);
        yNode.select('path').style("stroke", "#C4C4C4").style("fill", "none");
        yNode.selectAll('text').style("fill", "#C4C4C4");

        svg.append("text").text(this.ticker.id + " INTRADAY").attr("fill", "#05AFEC");

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

        svg.selectAll(".lineDots")
            .data(dataset, function (d) { return d.date; })
            .enter().append("circle")
            .attr("class", "lineDots")
            .attr("r", 3)
            .attr("cx", function (d) { return xScale(d.date); })
            .attr("cy", function (d) { return yScale(d.number); });


    }
}
