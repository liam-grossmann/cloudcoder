export enum PriceDirection {
    Up = 1,
    Down = 2,
    NoChange = 3
}

export interface ITicker {
    readonly id: string;
    readonly name: string;
    readonly close: number;
    bid: number;
    ask: number;
    last: number;
    priceDirection: PriceDirection;
    isSubscribing: boolean;
    setPrices(bid: number, ask: number): void;
    getNextRandomNumber(): number;
};

export class Ticker implements ITicker {

    bid: number;
    ask: number;
    priceDirection: PriceDirection;
    isSubscribing: boolean;
    last: number;

    constructor(public readonly id: string, public readonly name: string, public readonly close: number) {
        this.bid = null;
        this.ask = null;
        this.last = null;
        this.priceDirection = PriceDirection.NoChange;
        this.isSubscribing = false;
    }

    setPrices(bid: number, ask: number): void {

        let offset = 0;
        let lengthOfName = this.name.length;
        if ((lengthOfName === 4) || (lengthOfName === 6) || (lengthOfName === 8) || (lengthOfName === 9)) {
            offset = .01;
        } else {
            offset = -.01;
        }

        if (lengthOfName === 7) {
            offset = 0;
        }

        this.bid = bid + offset;
        this.ask = ask;
        this.last = (this.bid + this.ask) / 2;

        if (this.close === this.last) {
            this.priceDirection = PriceDirection.NoChange;
        }
        if (this.close < this.last) {
            this.priceDirection = PriceDirection.Up;
        }
        if (this.close > this.last) {
            this.priceDirection = PriceDirection.Down;
        }
    }

    getNextRandomNumber(): number {
        let randomnumber = .01;

        if (this.ask) {
            let maximum = this.ask * .01;
            let minimum = (this.ask * .01) * -1;
            randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        } else {
            let maximum = this.close * .01;
            let minimum = (this.close * .01) * -1;
            this.ask = this.close;
            this.bid = this.close;
            randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        }
        return randomnumber;
    }
}

