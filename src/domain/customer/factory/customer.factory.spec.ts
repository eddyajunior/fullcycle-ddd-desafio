import Address from "../value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("Should create a new customer", () => {

        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    })

    it("Should create a new customer with an address", () => {

        let address = new Address("Street 1", 1, "123456", "São Paulo");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    })

})