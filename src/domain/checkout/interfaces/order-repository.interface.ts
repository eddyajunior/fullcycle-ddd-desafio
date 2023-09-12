import Order from "../entities/order";
import RepositoryInterface from "../../@shared/interfaces/repository-base.interface";

export default interface OrderRepositoryInterface
    extends RepositoryInterface<Order> {}