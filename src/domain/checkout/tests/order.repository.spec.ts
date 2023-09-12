import { Sequelize } from "sequelize-typescript"

import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerModel from "../../customer/infrastructure/db/sequelize/model/customer.model";
import Customer from "../../customer/entities/customer";
import CustomerRepository from "../../customer/infrastructure/repositories/customer.repository";
import ProductRepository from "../../product/infrastructure/repositories/product.repository";
import OrderRepository from "../infrastructure/order.repository";
import Address from "../../customer/value-objects/address";

import OrderItem from "../entities/order-item";
import ProductModel from "../../product/infrastructure/db/sequelize/model/product.model";
import Product from "../../product/entity/product";
import Order from "../entities/order";

describe("Order repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });        

    it("Should create a new order", async() => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10, 1);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.quantity,
            product.id
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                { 
                    id: orderItem.id, 
                    name: orderItem.name, 
                    price: orderItem.price, 
                    quantity: orderItem.quantity,
                    orderId: order.id,
                    productId: product.id
                }
            ] 
        })
    });

    it("Should update a order", async() => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10, 1);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.quantity,
            product.id
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                { 
                    id: orderItem.id, 
                    name: orderItem.name, 
                    price: orderItem.price, 
                    quantity: orderItem.quantity,
                    orderId: order.id,
                    productId: orderItem.productId
                }
            ] 
        });

        const orderItem2 = new OrderItem(
            "1",
            product.name,
            product.price,
            15, 
            product.id
        );

        order.changeItems([orderItem2]);
        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel2?.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                { 
                    id: orderItem2.id, 
                    name: orderItem2.name, 
                    price: orderItem2.price, 
                    quantity: orderItem2.quantity,
                    orderId: order.id,
                    productId: orderItem.productId
                }
            ] 
        });

    });

    it("Should find a order", async() => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10, 1);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.quantity,
            product.id
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();        
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: "123" }})
        const foundOrder = await orderRepository.find("123");

        expect(orderModel?.toJSON()).toStrictEqual({
            id: foundOrder.id,
            customerId: foundOrder.customerId,
            total: foundOrder.total()
        });
    });    

    it("Should all orders", async() => {
        const customerRepository = new CustomerRepository();

        // Creating a customer
        const customer = new Customer("1", "Customer 1");        
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        // Creating products
        const productRepository = new ProductRepository();
        
        const product = new Product("1", "Product 1", 10, 1);
        await productRepository.create(product);

        const product2 = new Product("2", "Product 2", 25, 1);
        await productRepository.create(product2);
        
        const product3 = new Product("3", "Product 3", 125, 1);
        await productRepository.create(product3);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.quantity,
            product.id
        );

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.quantity,
            product2.id
        ); 

        const orderItem3 = new OrderItem(
            "3",
            product3.name,
            product3.price,
            product3.quantity,
            product3.id
        ); 

        const order = new Order("1", "1", [orderItem]);
        const order2 = new Order("2", "1", [orderItem2]);
        const order3 = new Order("3", "1", [orderItem3]);

        const orderRepository = new OrderRepository();        
        await orderRepository.create(order);
        await orderRepository.create(order2);
        await orderRepository.create(order3);

        const orderModels = await orderRepository.findAll();
        const orders = [order, order2, order3];

        expect(orderModels).toEqual(orders);
    });    
});