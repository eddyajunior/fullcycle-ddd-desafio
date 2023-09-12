import EventInterface from "../../interfaces/events/event.interface";

export default class CustomerAddressUpdatedEvent implements EventInterface
{
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
    
}