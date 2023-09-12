import Order from "../entities/order";
import OrderItem from "../entities/order-item";

export default class OrderAggregate {
    _customerId: number;
    _order: Order;
    _orderItems: OrderItem[];

    constructor(customerId: number, order: Order, orderItems: OrderItem[])
    {
        this._customerId = customerId;
        this._order = order;
        this._orderItems = orderItems;
    }
}
