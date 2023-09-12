import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/interfaces/product-repository.interface";
import ProductModel from "./sequelize/product.model";

export default class ProductRepository implements ProductRepositoryInterface
{
    async create(entity: Product): Promise<void> {
        
        await ProductModel.create({
            id: entity.id,
            name: entity.name, 
            price: entity.price,
            quantity: entity.quantity
        })
    }

    async update(entity: Product): Promise<void> {

        await ProductModel.update(
            {
            name: entity.name, 
            price: entity.price,
            quantity: entity.quantity
        },{
            where: {
                id: entity.id
            }
        })

    }

    // delete(id: number): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }

    async findAll(): Promise<Product[]> {
        
        const productModels = await ProductModel.findAll();
        
        return productModels.map((productModel) => 
            new Product(productModel.id, productModel.name, productModel.price, productModel.quantity)
        );
    }

    async find(id: string): Promise<Product> {

        const productModel = await ProductModel.findOne({ where: { id }});
        return new Product(productModel.id, productModel.name, productModel.price, productModel.quantity);
        
    }
    
}