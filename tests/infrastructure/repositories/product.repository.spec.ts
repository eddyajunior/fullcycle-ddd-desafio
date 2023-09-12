import { Sequelize } from "sequelize-typescript"

import ProductModel from "../../../src/infrastructure/db/sequelize/model/product.model";
import Product from "../../../src/domain/entities/product";
import ProductRepository from "../../../src/infrastructure/repositories/product.repository";

describe("Product repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });    

    it("Should create a product", async() => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100, 1);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100, 
            quantity: 1
        });
    });

    it("Should update a product", async() => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100, 1);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100,
            quantity: 1
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel2?.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200,
            quantity: 1
        });
    });    
    it("Should find a product", async() => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100, 1);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        const foundProduct = await productRepository.find("1");

        expect(productModel?.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
            quantity: foundProduct.quantity
        });
    });    
    it("Should find all products", async() => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100, 1);
        await productRepository.create(product);

        const product2 = new Product("2", "Product 2", 100, 1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
    });    
})