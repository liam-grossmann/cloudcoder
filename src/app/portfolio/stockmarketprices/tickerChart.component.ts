import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { D3Service, D3, Selection, ScaleTime, ScaleLinear } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface
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

        // Initialise dataset
        let dataset = this.ticker.intradayPrices;
        this.parseTimes(dataset);

        //  Initialise chart dimensions
        let margin = { top: 20, right: 50, bottom: 20, left: 40 };
        let width = 700 - margin.left - margin.right;
        let height = 200 - margin.top - margin.bottom;

        this.clearExistingChart();

        // Set the scale ranges
        let xScale = this.getXScaleRange(dataset, width);
        let yScale = this.getYScaleRange(dataset, height);

        // Define the axes
        var xAxis = this.d3.axisBottom(xScale).ticks(7);
        var yAxis = this.d3.axisRight(yScale).ticks(10);

        // Initiate the line function
        var lineFunction = this.d3.line<any>()
            .curve(this.d3.curveMonotoneX)
            .x(function (d) { return xScale(d.time); })
            .y(function (d) { return yScale(d.stockPrice); });

        // Initiate the area line function
        var areaFunction = this.d3.area<any>()
            .curve(this.d3.curveMonotoneX)
            .x(function (d) { return xScale(d.time); })
            .y0(height)
            .y1(function (d) { return yScale(d.stockPrice); });

        // Add the svg canvas for the line chart
        var svg = this.d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Gradient below the line chart
        var areaGradient = svg.append('defs')
            .append("linearGradient")
            .attr('id', 'areaGradient')
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "0%").attr("y2", "100%");

        // Append the first stop - the color at the top                  
        areaGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#05AFEC")
            .attr("stop-opacity", 0.6);

        //Append the second stop - white transparant almost at the end		
        areaGradient.append("stop")
            .attr("offset", "95%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 0);

        // add the X gridlines
        // svg.append("g")
        //     .attr("class", "grid")
        //     .call(this.d3.axisLeft(yScale)
        //         .ticks(5)
        //         .tickSize(-width)
        //         .tickFormat(null));

        // Add the X Axis
        let xNode = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        xNode.select('path').style("stroke", "#C4C4C4").style("fill", "none");
        xNode.selectAll('text').style("fill", "#C4C4C4");

        // Add the Y Axis
        let yNode = svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + " ,0)")
            .call(yAxis);
        yNode.select('path').style("stroke", "#C4C4C4").style("fill", "none");
        yNode.selectAll('text').style("fill", "#C4C4C4");

        // Add chart title
        svg.append("text").text(this.ticker.id + " INTRADAY").attr("fill", "#05AFEC");

        // Draw the underlying area chart filled with the gradient
        svg.append("path")
            .attr("class", "area")
            .style("fill", "url(#areaGradient)")
            .attr("d", areaFunction(dataset));

        svg.append("path")
            .attr("class", "line")
            .attr("d", lineFunction(dataset));

        svg.selectAll(".lineDots")
            .data(dataset, function (d) { return d.time; })
            .enter().append("circle")
            .attr("class", "lineDots")
            .attr("r", 3)
            .attr("cx", function (d) { return xScale(d.time); })
            .attr("cy", function (d) { return yScale(d.stockPrice); });
    }

    // Parse the time for each item in the dataset
    parseTimes(dataset: any[]): void {
        var parseTime = this.d3.timeParse("%H:%M");
        dataset.forEach(function (d) {
            d.time = parseTime(d.timeString);
        });
    }

    clearExistingChart(): void {
        this.d3.select("#chart").selectAll("*").remove();
    }

    getXScaleRange(dataset: any[], width: number): ScaleTime<number, number> {
        return this.d3.scaleTime()
            .domain(this.d3.extent(dataset, function (d) { return d.time; }))
            .range([0, width]);
    }

    getYScaleRange(dataset: any[], height: number): ScaleLinear<number, number> {
        return this.d3.scaleLinear()
            .domain(this.d3.extent(dataset, function (d) { return d.stockPrice; }))
            .range([height, 0])
            .nice();
    }
}
