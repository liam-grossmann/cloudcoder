export interface IBond {
    readonly isin: string;
    readonly name: string;
    readonly cleanPrice: number;
    readonly dirtyPrice: number;
    readonly interest: number;
    readonly bondYield: number;
};

export class Bond implements IBond {

    public readonly isin: string;
    public readonly name: string;
    public readonly cleanPrice: number;
    public readonly dirtyPrice: number;
    public readonly interest: number;
    public readonly bondYield: number;

    constructor(data: any) {
        this.isin = data.IsinCode;
        this.name = data.InstrumentName;
        this.cleanPrice = (parseInt((data.CleanPrice * 100).toString(), 10) / 100);
        this.dirtyPrice = (parseInt((data.DirtyPrice * 100).toString(), 10) / 100);
        this.interest = data.AccruedInterest;
        this.bondYield = data.Yield;
    }
}

