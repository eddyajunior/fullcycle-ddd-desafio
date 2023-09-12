import Address from "../entities/address";

export default class CustomerAggregate {
    _id: number;
    _name: string;
    _address: Address;

    constructor(id: number, name: string, address: Address)
    {
        this._id = id;
        this._name = name;
        this._address = address;
    }
}
