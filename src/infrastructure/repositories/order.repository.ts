import Order from "../../domain/entities/order";
import OrderRepositoryInterface from "../../domain/interfaces/order-repository.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entities/order-item";

export default class OrderRepository implements OrderRepositoryInterface
{
    async  create(entity: Order): Promise<void> {
        
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) =>({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        
        entity.items.map((item) => {
            let orderItem = OrderItemModel.findOne({ where: { id: item.id } });
            
            if (orderItem){
                OrderItemModel.update({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId
                },
                { 
                    where: { id: item.id }
                });
            }
        });

        await OrderModel.update({            
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) =>({
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity
            }))
        },{
            where: {
                id: entity.id,
            }
        }
        );
    }
    
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll();
        const orderItemModels = await OrderItemModel.findAll();

        const orders: Order[] = [];
        
        orderModels.map((order) => {
            const items:OrderItem[] = [];

            orderItemModels.map((item) => 
            {
                if (item.orderId === order.id)
                    items.push(new OrderItem(item.id, item.name, item.price, item.quantity, item.productId))
            });

            orders.push(new Order(order.id, order.customerId, items))
            }
        );        

        return orders;
    }

    async find(id: string): Promise<Order> {
        const orderItemModels = await OrderItemModel.findAll();        

        const items:OrderItem[] = [];
        
        orderItemModels.map((item) => 
            items.push(new OrderItem(item.id, item.name, item.price, item.quantity, item.productId))
        );

        const orderModel = await OrderModel.findOne({ where: { id }});        

        return new Order(orderModel.id, orderModel.customerId, items);
    }
}
