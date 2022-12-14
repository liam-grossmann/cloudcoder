export enum PriceDirection {
    Up = 1,
    Down = 2,
    NoChange = 3
}

export interface ITicker {
    readonly id: string;
    readonly name: string;
    readonly close: number;
    readonly exchange: string;
    readonly yearHigh: number;
    readonly yearLow: number;
    readonly sector: string;
    readonly marketCap: string;
    readonly volume: number;
    readonly annualVolatility: number;     // 25% annual volatility
    readonly annualReturn: number;         // 12% annual return
    readonly imageUrl: string;
    last: number;
    high: number;
    low: number;
    change: number;
    changePercent: number;
    priceDirection: PriceDirection;
    isSubscribing: boolean;

    intradayPrices: any[];

    initialiseIntradayPrices(): void;
    updatePrices(nextPrice: number): void;
    getNextPrice(): number;
    randomDrawFromNormalDistribution(): number;
    normSInv(p): number;
};

export class Ticker implements ITicker {

    last: number;
    high: number;
    low: number;
    change: number;
    changePercent: number;
    priceDirection: PriceDirection;
    isSubscribing: boolean;
    intradayPrices: any[] = [];

    constructor(public readonly id: string, 
        public readonly name: string, 
        public readonly close: number,
        public readonly exchange: string,
        public readonly yearHigh: number,
        public readonly yearLow: number,
        public readonly sector: string,
        public readonly marketCap: string,
        public readonly volume: number,
        public readonly annualVolatility: number,
        public readonly annualReturn: number,
        public readonly imageUrl: string) {

        this.high = this.close;
        this.low = this.close;
        this.updatePrices(this.close);
        this.initialiseIntradayPrices();
        this.priceDirection = PriceDirection.NoChange;
        this.isSubscribing = true;
    }

    updatePrices(nextPrice: number): void {
        this.last = nextPrice;
        this.change = this.last - this.close;
        this.changePercent = ((this.change) * 100) / this.close;
        this.high = Math.max(this.high, this.last);
        this.low = Math.min(this.low, this.last);

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

    initialiseIntradayPrices() : void {
        let hour = 9;
        let minute = 0;
        let lastPrice = this.close;

        for (let n = 1; n <= 200; n++) {
            if (minute >= 60) {
                hour = hour + 1;
                minute = 0;
            }

            lastPrice = this.getNextPrice();

            minute = minute + 1;
            let timeString = hour + ':' + minute.toString();
            this.intradayPrices.push({  timeString: timeString, stockPrice: lastPrice, time: null });

            this.high = Math.max(this.high, lastPrice);
            this.low = Math.min(this.low, lastPrice);
        }
    }

    getNextPrice(): number {
        let monthlyReturn = this.annualReturn / 12;
        let monthlyVolatility = this.annualVolatility * Math.sqrt(1/12) * this.randomDrawFromNormalDistribution();
        let changeFactor = monthlyReturn + monthlyVolatility; 
        return this.last + changeFactor;
    }

    randomDrawFromNormalDistribution(): number {
        return this.normSInv(Math.random());
    }

    normSInv(p): number {
        let a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
        let a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
        let b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
        let b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
        let c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
        let c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
        let d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
        let p_low = 0.02425, p_high = 1 - p_low;
        let q, r;
        let retVal;

        if ((p < 0) || (p > 1)) {
            console.log('NormSInv: Argument out of range.');
            retVal = 0;
        } else if (p < p_low) {
            q = Math.sqrt(-2 * Math.log(p));
            retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        } else if (p <= p_high) {
            q = p - 0.5;
            r = q * q;
            retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
        } else {
            q = Math.sqrt(-2 * Math.log(1 - p));
            retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
        }
        return retVal;
    }
}

