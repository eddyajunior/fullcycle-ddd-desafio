import EventHandlerInterface from "../../../@shared/interfaces/events/event-handler.interface"
import CustomerCreatedEvent from "../customer-created.event";

export default class WriteConsoleWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>
{
    handler(event: CustomerCreatedEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

    // enviaConsoleLog1Handler(): void{
    //     console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    // }
    // enviaConsoleLog2Handler(): void{
    //     console.log("Esse é o segundo console.log do evento: CustomerCreated");
    // }
}