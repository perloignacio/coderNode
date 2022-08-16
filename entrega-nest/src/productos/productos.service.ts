import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoDocument } from './schemas/producto.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductosService {
  constructor( 
    @InjectModel(Producto.name) private readonly productoModel: Model<ProductoDocument>, 
  ) {}
  create(createProductoDto: CreateProductoDto):Promise<Producto> {
    return this.productoModel.create(createProductoDto)
  }

  async findAll(): Promise<Producto[]> { 
    return this.productoModel.find().exec();
  }

  async findOne(id: string): Promise<Producto> { 
    return this.productoModel.findOne({ _id: id }).exec(); 
  }

  async update(id: string, updateProductDto: UpdateProductoDto): Promise<Producto> { 
    return this.productoModel.findOneAndUpdate({ _id: id }, updateProductDto, { 
      new: true, 
    });
  }

  async remove(id: string) { 
    return this.productoModel.findByIdAndRemove({ _id: id }).exec(); 
  }
}
