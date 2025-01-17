import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  create(@Body() product: Product): Product {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product): Product {
    return this.productsService.update(Number(id), product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    return this.productsService.remove(Number(id));
  }

  @Put(':id/restore')
  restore(@Param('id') id: string): Product {
    return this.productsService.restore(Number(id));
  }
}
