import Address from "../../customer/value-objects/address";
import Customer from "../../customer/entities/customer";
import Order from "../../checkout/entities/order";
import OrderItem from "../../checkout/entities/order-item";

// Customer Aggregate - Relationship ID
let customer = new Customer("123", "Edson Amaral");
const address = new Address("Rua 1", 1, "123456-000", "São Paulo");
customer.Address = address;
customer.activate();

// Order Aggregate - Relationship Object - Entity 
const item1 = new OrderItem("1", "Item 1", 10, 1, "1");
const item2 = new OrderItem("2", "Item 2", 12, 1, "1");
const item3 = new OrderItem("3", "Item 3", 13, 1, "1");

const order = new Order("1", "1234", [item1, item2, item3]);