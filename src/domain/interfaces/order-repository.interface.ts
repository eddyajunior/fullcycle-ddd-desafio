import Order from "../entities/order";
import RepositoryInterface from "./repository-base.interface";

export default interface OrderRepositoryInterface
    extends RepositoryInterface<Order> {}