import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private toastr: ToastrService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    //se carga el paginado
    this.productsService.getProductsByPage(10, 1)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggelProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.toggelProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.toastr.success('Detail loaded', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    },err => {
      this.toastr.error('Error', 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
      this.toastr.success('Producto Eliminado', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    },
    err => {
      this.toastr.error(err.error.mensaje, 'Error', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      }
    );
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
