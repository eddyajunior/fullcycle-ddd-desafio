import Customer from "../entities/customer";
import RepositoryInterface from "../../@shared/interfaces/repository-base.interface";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> {}