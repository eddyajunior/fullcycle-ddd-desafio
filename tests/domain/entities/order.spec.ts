import Order from '../../../src/domain/entities/order';
import OrderItem from '../../../src/domain/entities/order-item';

describe("Order unit tests", () => {

    it("Should throw error when id is empty", () => {
        
        expect(() => {
            let customer = new Order("", "1", []);            
        }).toThrowError("Id is required");

    })

    it("Should throw error when customer id is empty", () => {
        
        expect(() => {
            let customer = new Order("1", "", []);            
        }).toThrowError("CustomerId is required");

    })

    it("Should throw error when items less 0", () => {
        
        expect(() => {
            let customer = new Order("1", "1", []);            
        }).toThrowError("Items greater than 0");

    })

    it("Should calculate total", () => {
        
        let item1 = new OrderItem("1", "Item 1", 15, 1, "1");
        let item2 = new OrderItem("2", "Item 1", 38, 2, "1");
        let item3 = new OrderItem("3", "Item 1", 150, 10, "3");

        let order = new Order("1", "Customer 1", [item1, item2, item3]); 
        let total = order.total();

        expect(total).toBe(1591);

    })

})