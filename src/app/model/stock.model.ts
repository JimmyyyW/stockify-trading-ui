export interface Stock {
    _id: String;
    name: String;
    symbol: String;
    value: Number;
    volume: Number;
    open: Number;
    close: Number;
    gains: Number;
    isPositive: boolean;
}