import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type ProductoDocument = Producto & Document; 



@Schema() 
export class Producto {
  @Prop() 
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  codigo: string;

  @Prop()
  precio: number;

  @Prop()
  stock: number;

  @Prop()
  foto: string;

  
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
