import Customer from "../../../src/domain/entities/customer";
import Order from "../../../src/domain/entities/order";
import OrderItem from "../../../src/domain/entities/order-item"
import OrderService from "../../../src/domain/services/order.service";

describe("Order service unit tests", () => {

    it("Should get total of all orders", () => {

        const customer = new Customer("1", "Customer 1");
        const item1 = new OrderItem("1", "Item 1", 18, 2, "1");
        
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(18);
        expect(order.total()).toBe(36);

    })

    it("Should get total of all orders", () => {
        
        const orderItem1 = new OrderItem("1", "Item 1", 100, 8, "1");
        const orderItem2 = new OrderItem("2", "Item 2", 200, 2, "2");
        const orderItem3 = new OrderItem("3", "Item 3", 300, 3, "3");

        const order = new Order("1", "1", [orderItem1]);
        const order2 = new Order("2", "2", [orderItem2]);
        const order3 = new Order("3", "3", [orderItem3]);

        const total = OrderService.total([order, order2, order3]);

        expect(total).toBe(2100);
    })


})