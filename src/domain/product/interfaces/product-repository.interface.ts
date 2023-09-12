import Product from "../entity/product";
import RepositoryInterface from "../../@shared/interfaces/repository-base.interface";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> {}