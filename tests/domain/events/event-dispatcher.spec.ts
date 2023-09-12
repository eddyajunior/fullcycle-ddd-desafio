import EventDispatcher from "../../../src/domain/events/event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../../src/domain/events/product/handler/send-email-when-product-is-created.handler";

describe("Domain events tests", () => {

    it("Should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })
})