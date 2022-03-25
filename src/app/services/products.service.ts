import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private apiUrl = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  //actualizado para repetir la peticion
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl + "listarProduct", { params })
    .pipe(
      retry(3)
    );
  }

  getProduct(id:string) {
    return this.http.get<Product>(this.apiUrl + "detalleProduct/" +id);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl + "listarProduct/" + limit + "/" + offset)
  }

  getProductsByCat(categoryId: number,limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl + "listarProductCat/" + categoryId + "/" + limit + "/" + offset)
  }

  create(dto:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl + "guardarProduct",dto);
  }

  update(id:string,dto:UpdateProductDTO){
    return this.http.put<Product>(this.apiUrl +"actualizarProduct",dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + "eliminarProduct/" + id);
  }
}
