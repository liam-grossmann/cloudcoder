import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ITicker, Ticker } from './watchList';

@Component({
    selector: 'ticker-details',
    templateUrl: './tickerDetails.component.html',
    styleUrls: ['./tickerDetails.component.css']
})
export class TickerDetailsComponent implements OnInit {

    @Input() ticker: Ticker;

    constructor() {}

    ngOnInit() {}
}
