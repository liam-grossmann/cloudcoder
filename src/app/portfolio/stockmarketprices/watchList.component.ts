import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ITicker } from './watchList';
import { WatchListService } from './watchList.service';

@Component({
    selector: '<watch-list>',
    templateUrl: './watchList.component.html',
    styleUrls: ['./watchList.component.css']
})
export class WatchListComponent implements OnInit, OnDestroy {

    watchList: ITicker[] = [];
    tickerTapeServiceId: number;
    subscription: any;

    constructor(private _watchListService: WatchListService) { }

    ngOnInit() {
        this.watchList = this._watchListService.getWatchList();
        let timer = TimerObservable.create(2000, 500);
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

    onTickerTape(): void {
        for (let ticker of this.watchList) {
            if (ticker.isSubscribing) {
                let randomnumber = ticker.getNextRandomNumber();
                ticker.setPrices(ticker.bid - randomnumber, ticker.ask + randomnumber);
            }
        }
    }
}
