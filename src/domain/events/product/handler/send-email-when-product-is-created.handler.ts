import EventHandlerInterface from "../../../interfaces/events/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>
{
    handler(event: ProductCreatedEvent): void {
        console.log(`Sending email to ...`);
    }
    
}