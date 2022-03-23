import { Category } from "./category.model";

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

//creamos esta extencion donde el id y la categoria no son necesarias
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

//creamos esta extencion ponemos que todos los atributos son opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
