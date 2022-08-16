import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductDto: CreateProductoDto) {
    return this.productosService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id); 
  }
}
