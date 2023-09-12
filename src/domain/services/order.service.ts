import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order-item";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static placeOrder(customer: Customer, orders: OrderItem[]): Order
    {
        if (orders.length === 0){
            throw new Error("Order must have at least one item.");
        }

        const order = new Order(uuid(), customer.id, orders);
        customer.addRewardPoints(order.total()/2);

        return order;
    }

    static total(orders: Order[]):number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}