import EventHandlerInterface from "../../../@shared/interfaces/events/event-handler.interface"
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class WriteConsoleWhenCustomerAddressIsUpdatedHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent>
{
    handler(event: CustomerAddressUpdatedEvent): void {
        const data = event.eventData;
        console.log(`Endereço do cliente: ${data.customerId}, ${data.customerName} alterado para: ${data.street}, ${data.number} - ${data.zipcode} - ${data.city}`);
    }
}