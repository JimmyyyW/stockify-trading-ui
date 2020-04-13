export interface Shares {
    _id: string,
    username: string,
    shares: Map<string, number>
}

export class Share {
    symbol: string;
    volume: number;

    constructor(symbol: string, volume: number) {
        this.symbol = symbol;
        this.volume = volume;
    }
}