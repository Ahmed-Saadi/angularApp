import { Routes } from '@angular/router';
import { CostumersComponent } from './costumers/costumers.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: 'costumers', component: CostumersComponent },
  { path: 'products', component: ProductsComponent },
];
