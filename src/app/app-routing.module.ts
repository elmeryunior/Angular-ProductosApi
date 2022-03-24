import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './categories/animal/animal.component';
import { NatureComponent } from './categories/nature/nature.component';
import { PeopleComponent } from './categories/people/people.component';
import { TechComponent } from './categories/tech/tech.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'people', component: PeopleComponent},
  { path: 'nature', component: NatureComponent},
  { path: 'animal', component: AnimalComponent},
  { path: 'tech', component: TechComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
