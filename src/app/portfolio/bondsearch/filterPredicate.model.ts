export interface IFilterPredicate {
    readonly propertyId: string;
    readonly propertyName: string;
    readonly operator: string;
    readonly value: string;
};

export class FilterPredicate implements IFilterPredicate {

    constructor(public readonly propertyId: string,
    public readonly propertyName: string,    
    public readonly operator: string,
    public readonly value: string) {
    }

    toString(): string {
        return ' ' + this.propertyName + ' ' + this.operator + ' ' + this.value;
    }
}

