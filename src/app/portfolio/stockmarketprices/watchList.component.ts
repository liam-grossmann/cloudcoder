import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ITicker, Ticker } from './watchList';
import { WatchListService } from './watchList.service';


@Component({
    selector: '<watch-list>',
    templateUrl: './watchList.component.html',
    styleUrls: ['./watchList.component.css']
})
export class WatchListComponent implements OnInit, OnDestroy {

    watchList: ITicker[] = [];
    selectedTicker: Ticker;
    tickerTapeServiceId: number;
    subscription: any;

    constructor(private _watchListService: WatchListService) { 
    }

    ngOnInit() {
        this.watchList = this._watchListService.getWatchList();
        this.selectedTicker = this.watchList[0];
        let timer = TimerObservable.create(2000, 1000);
        this.subscription = timer.subscribe(t => {
            this.onTickerTape();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toggleSubscribe(ticker: ITicker): void {
        ticker.isSubscribing = !ticker.isSubscribing;
    }

    toggleSelection(ticker: ITicker): void {
        this.selectedTicker = ticker;
    }

    onTickerTape(): void {
        for (let ticker of this.watchList) {
            if (ticker.isSubscribing) {
                let nextPrice = ticker.getNextPrice();
                ticker.updatePrices(nextPrice);
                this.selectedTicker = this.selectedTicker;
            }
        }
    }
}
