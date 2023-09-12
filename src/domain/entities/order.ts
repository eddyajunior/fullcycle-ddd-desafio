import OrderItem from "./order-item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();

        this.validate();
    }

    get items(): OrderItem[]{
        return this._items;
    }

    get customerId(): string{
        return this._customerId;
    }

    get id(): string{
        return this._id;
    }

    validate(): boolean {
        if (this._id.length === 0){
            throw new Error("Id is required");
        }
        if (this._customerId.length === 0){
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0){
            throw new Error("Items greater than 0");
        }
        if (this._total <= 0){
            throw new Error("Total greater than 0");
        }

        return true;
    }

    changeItems(items: OrderItem[]){
        this._items = items;
        this.validate();
    } 

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}