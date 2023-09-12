import Customer from "../entities/customer";
import RepositoryInterface from "./repository-base.interface";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> {}