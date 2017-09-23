export interface IFilterProperty {
    readonly id: string;
    readonly name: string;
    readonly type: string;
};

export class FilterProperty implements IFilterProperty {

    constructor(public readonly id: string,
        public readonly name: string,
        public readonly type: string) {
    }

    toString(): string {
        return this.name;
    }
}