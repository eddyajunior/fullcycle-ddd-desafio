import EventDispatcherInterface from "../interfaces/events/event-dispatcher.interface";
import EventHandlerInterface from "../interfaces/events/event-handler.interface";
import EventInterface from "../interfaces/events/event.interface";

export default class EventDispatcher implements EventDispatcherInterface
{
    private eventHandlers: { [eventName: string]: EventHandlerInterface[]} = {};

    get getEventHandlers(): {[eventName: string]: EventHandlerInterface[] }{
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        
        if(!this.eventHandlers[eventName])
        {
            this.eventHandlers[eventName] = [];            
        }

        this.eventHandlers[eventName].push(eventHandler);
    }
    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        throw new Error("Method not implemented.");
    }
    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }
    
}