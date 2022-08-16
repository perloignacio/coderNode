export class CreateProductoDto {
    readonly nombre: string;
    readonly descripcion: string;
    readonly codigo: string;
    readonly precio: number;
    readonly stock: number;
    readonly foto: string;
}