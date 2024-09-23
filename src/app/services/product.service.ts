import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Product[];

  constructor() {
    this.products = [
      { id: 1, name: 'pc', price: 3500,promotion: false},
      { id: 2, name: 'phone', price: 1500 ,promotion: false},
      { id: 3, name: 'camera', price: 1000 ,promotion: false},
    ];
  }



  public getAllProducts () : Observable <Product[]>{
          return of(this.products);
  }

  public deleteProduct(index:number ) : Observable<Product[]>{
    this.products = this.products.filter(p => p.id != index ) 
    return of(this.products);
  }
}

