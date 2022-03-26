import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  product: UpdateProductDTO

  constructor(
    private productservice: ProductsService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productservice.getProduct(id)
    .subscribe(data=>{
      this.product = data;
    },
      err => {
        this.toastr.error(err.error.mensaje, 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['']);
      }
    );
  }

  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.productservice.update(id,this.product).subscribe(
      data => {
        this.toastr.success('Product Updated', 'OK', {
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
