import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import ProductB from "../entity/productB";

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {

        switch(type){
            case "A":
                return new Product(uuid(), name, price, 1);
            case "B":
                return new ProductB(uuid(), name, price);
            default:
                throw new Error("Product type not supported")

        }
        
    }
}