import Product from "../../entities/product";
import RepositoryInterface from "../repository-base.interface";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> {}