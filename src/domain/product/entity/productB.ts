import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface{
    private _id: string;
    private _name: string;
    private _price: number;

    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }

    constructor(id:string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price;
    }
}