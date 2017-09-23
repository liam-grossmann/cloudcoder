import { Injectable } from '@angular/core';
import { Ticker, ITicker } from './watchList';

@Injectable()
export class WatchListService {
    constructor() { }

    getWatchList(): ITicker[] {
        let listToReturn = new Array<Ticker>();
        listToReturn.push(new Ticker('AAPL', 'Apple', 103.82));
        listToReturn.push(new Ticker('AMZN', 'Amazon', 290.00));
        // listToReturn.push(new Ticker('EA', 'Electronic Arts', 50.09));
        listToReturn.push(new Ticker('EBAY', 'eBay', 64.67,));
        listToReturn.push(new Ticker('FB', 'Facebook', 78.15));
        listToReturn.push(new Ticker('GOOG', 'Google', 342.66, ));
        listToReturn.push(new Ticker('IBM', 'IBM',  36.24,));
        listToReturn.push(new Ticker('INTC', 'Intel',  36.24,));
        listToReturn.push(new Ticker('MSFT', 'Microsoft', 44.24,));
        listToReturn.push(new Ticker('NFLX', 'Netflix', 339.34));
        // listToReturn.push(new Ticker('ORCL', 'Oracle', 339.34));
        listToReturn.push(new Ticker('YHOO', 'Yahoo!', 45.47));
        return listToReturn;
    }
}