import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product,CreateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  products: Product[] = [];
  title = '';
  description =  '';
  images = [`https://placeimg.com/640/480/any?random=${Math.random()}`];
  price = 0;
  categoryId = 2;

  categories = [
    {valor:1, muestraValor:'Tech'},
    {valor:2, muestraValor:'Animal'},
    {valor:3, muestraValor:'People'},
    {valor:4, muestraValor:'Nature'}
  ];

  seleccionada: number = this.categories[0].valor;

  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(){
    const product: CreateProductDTO ={
      title: this.title,
      description: this.description,
      images: [
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`,
        `https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: this.price,
      categoryId: this.seleccionada,
    }
    this.productsService.create(product)
    .subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
