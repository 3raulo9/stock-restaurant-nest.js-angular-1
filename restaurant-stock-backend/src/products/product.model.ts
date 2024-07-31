export class Product {
  id: number;
  name: string;
  quantity: number;
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
