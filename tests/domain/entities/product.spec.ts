import Product from '../../../src/domain/entities/product';

describe("Product unit tests", () => {

    it("Should throw error when id is empty", () => {
        
        expect(() => {
            
            let product = new Product("", "Product 1", 1, 1);            

        }).toThrowError("Id is required");
    })

    it("Should throw error when name is empty", () => {
        
        expect(() => {
            
            let product = new Product("1", "", 1, 1);            

        }).toThrowError("Name is required");
    })

    it("Should throw error when price less than zero", () => {
        
        expect(() => {
            
            let product = new Product("1", "Product 1", -1, 1);            

        }).toThrowError("Price greater then 0");
    })

    it("Should throw error when price equals zero", () => {
        
        expect(() => {
            
            let product = new Product("1", "Product 1", 0, 1);            

        }).toThrowError("Price greater then 0");
    })
    it("Should throw error when quantity less than zero", () => {
        
        expect(() => {
            
            let product = new Product("1", "Product 1", 1, -1);            

        }).toThrowError("Quantity greater then 0");
    })

    it("Should throw error when quantity equals zero", () => {
        
        expect(() => {
            
            let product = new Product("1", "Product 1", 1, 0);            

        }).toThrowError("Quantity greater then 0");
    })
    it("Should change name", () => {
        
        const product = new Product("1", "Product 1", 12, 1);
        product.changeName("Product 2");
        
        expect(product.name).toBe("Product 2");
    })

    it("Should change price", () => {
        
        const product = new Product("1", "Product 1", 12, 1);
        product.changePrice(150);
        
        expect(product.price).toBe(150);
    })

    it("Should change quantity", () => {
        
        const product = new Product("1", "Product 1", 12, 1);
        product.changeQuantity(3);
        
        expect(product.quantity).toBe(3);
    })
    it("Should get order item total", () => {
        
        const product = new Product("1", "Product 1", 15, 7);

        let orderItemTotal = product.orderItemTotal();
        
        expect(orderItemTotal).toBe(105);
    })
})