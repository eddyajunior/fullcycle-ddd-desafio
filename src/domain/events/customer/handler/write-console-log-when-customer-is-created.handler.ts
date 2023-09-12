import EventHandlerInterface from "../../../interfaces/events/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class WriteConsoleWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>
{
    handler(event: CustomerCreatedEvent): void {
        this.enviaConsoleLog1Handler();
        this.enviaConsoleLog2Handler();
    }

    enviaConsoleLog1Handler(): void{
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
    enviaConsoleLog2Handler(): void{
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}