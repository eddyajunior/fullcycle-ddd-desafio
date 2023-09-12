import { Sequelize } from "sequelize-typescript"

import EventDispatcher from "../../../src/domain/events/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../../src/domain/events/product/handler/send-email-when-product-is-created.handler";
import WriteConsoleWhenCustomerIsCreatedHandler from "../../../src/domain/events/customer/handler/write-console-log-when-customer-is-created.handler";
import WriteConsoleWhenCustomerAddressIsUpdatedHandler from "../../../src/domain/events/customer/handler/write-console-log-when-customer-address-is-updated.handler";

import ProductCreatedEvent from "../../../src/domain/events/product/product-created.event";
import CustomerCreatedEvent from "../../../src/domain/events/customer/customer-created.event";
import CustomerRepository from "../../../src/infrastructure/repositories/customer.repository";
import Customer from "../../../src/domain/entities/customer";
import Address from "../../../src/domain/entities/address";
import CustomerModel from "../../../src/infrastructure/db/sequelize/model/customer.model";
import CustomerAddressUpdatedEvent from "../../../src/domain/events/customer/customer-address-updated.event";


describe("Domain events tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });            

    it("Should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("Should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
        ).toBe(0);
    })

    it("Should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    })

    it("Should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        // Quando executar o notify, o sendEmailWhenProductIsCreatedHandler.handle() deverá ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })

    it("Should notify when create a new customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);
    
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id }});
    
        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });

        const eventName = "CustomerCreatedEvent";
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new WriteConsoleWhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register(eventName, eventHandler);

        expect(
            eventDispatcher.getEventHandlers[eventName][0]
        ).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })

    it("Should notify when customer address is changed", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "123456", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id }});

        expect(customerModel?.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        });

        const eventCreatedName = "CustomerCreatedEvent";
        const eventCreatedDispatcher = new EventDispatcher();
        const eventCreatedHandler = new WriteConsoleWhenCustomerIsCreatedHandler();
        const spyEventCreatedHandler = jest.spyOn(eventCreatedHandler, "handler");

        eventCreatedDispatcher.register(eventCreatedName, eventCreatedHandler);

        expect(
            eventCreatedDispatcher.getEventHandlers[eventCreatedName][0]
        ).toMatchObject(eventCreatedHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name
        });

        eventCreatedDispatcher.notify(customerCreatedEvent);

        expect(spyEventCreatedHandler).toHaveBeenCalled();

        const address2 = new Address("Street 2", 1, "123456", "City 2");
        customer.changeAddress(address2);

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: customer.id }});

        expect(customerModel2?.toJSON()).toStrictEqual({
            id: customer.id,
            name:customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address2.street,
            number: address2.number,
            zipcode: address2.zip,
            city: address2.city
        });

        const eventName = "CustomerAddressUpdatedEvent";
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new WriteConsoleWhenCustomerAddressIsUpdatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        eventDispatcher.register(eventName, eventHandler);

        expect(
            eventDispatcher.getEventHandlers[eventName][0]
        ).toMatchObject(eventHandler);

        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
            customerId: customer.id,
            customerName: customer.name,
            street: address2.street,
            number: address2.number,
            zipcode: address2.zip,
            city: address2.city
        });

        eventDispatcher.notify(customerAddressUpdatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })
})