import ProductInterface from "./product.interface";

export default class Product implements ProductInterface{
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity!: number;

    constructor(
        id:string, 
        name:string, 
        price:number,
        quantity:number)
    {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;

        this.validate();
    }

    get total(): number{
        return this.orderItemTotal();
    }

    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get price(): number {
        return this._price;
    }
    get quantity(): number {
        return this._quantity;
    }

    changeName(name: string) {
        this._name = name;

        this.validate();
    }

    changePrice(price: number) {
        this._price = price;

        this.validate();
    }
    changeQuantity(quantity: number) {
        this._quantity = quantity;
        this.validate();
    }

    validate():boolean {
        if (this._id.length === 0)
        {
            throw new Error("Id is required");
        }

        if (this._name.length === 0)
        {
            throw new Error("Name is required");
        }

        if (this._price <= 0)
        {
            throw new Error("Price greater then 0");
        }

        if (this._quantity <= 0)
        {
            throw new Error("Quantity greater then 0");
        }

        return true;
    }

    orderItemTotal():number {
        return this._price * this._quantity;
    }

    
}