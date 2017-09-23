import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ticker-price-direction',
    templateUrl: './tickerPriceDirection.component.html'
})
export class TickerPriceDirectionComponent implements OnInit {

    @Input() priceDirection: number;

    constructor() { }

    ngOnInit() { }
}