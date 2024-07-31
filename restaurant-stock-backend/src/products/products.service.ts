import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private readonly dbPath = join(__dirname, '../../src/database.json');

  private readDatabase(): any {
    const data = readFileSync(this.dbPath, 'utf8');
    return JSON.parse(data);
  }

  private writeDatabase(data: any): void {
    writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  findAll(): Product[] {
    const db = this.readDatabase();
    return db.products
      .filter((product: Partial<Product>) => !product.isDeleted)
      .map((product: Partial<Product>) => new Product(product));
  }

  findOne(id: number): Product {
    const db = this.readDatabase();
    const product = db.products.find(
      (prod: Product) => prod.id === id && !prod.isDeleted,
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(product: Product): Product {
    const db = this.readDatabase();
    product.id = db.products.length
      ? Math.max(...db.products.map((p: Product) => p.id)) + 1
      : 1;
    product.createdAt = new Date();
    product.updatedAt = new Date();
    product.isDeleted = false;
    db.products.push(product);
    this.writeDatabase(db);
    return product;
  }

  update(id: number, updatedProduct: Product): Product {
    const db = this.readDatabase();
    const productIndex = db.products.findIndex(
      (prod: Product) => prod.id === id && !prod.isDeleted,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = db.products[productIndex];
    db.products[productIndex] = {
      ...product,
      ...updatedProduct,
      updatedAt: new Date(),
    };
    this.writeDatabase(db);
    return db.products[productIndex];
  }

  remove(id: number): { message: string } {
    const db = this.readDatabase();
    const productIndex = db.products.findIndex(
      (prod: Product) => prod.id === id,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (db.products[productIndex].isDeleted) {
      throw new BadRequestException('The product is already deleted');
    }
    db.products[productIndex].isDeleted = true;
    this.writeDatabase(db);
    return { message: `Product with ID ${id} has been deleted` };
  }

  restore(id: number): Product {
    const db = this.readDatabase();
    const productIndex = db.products.findIndex(
      (prod: Product) => prod.id === id && prod.isDeleted,
    );
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    db.products[productIndex].isDeleted = false;
    db.products[productIndex].updatedAt = new Date();
    this.writeDatabase(db);
    return db.products[productIndex];
  }
}
