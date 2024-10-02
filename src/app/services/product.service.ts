import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Product[];

  constructor() {
    this.products = [
      { id: UUID.UUID(), name: 'pc', price: 3500, promotion: false },
      { id: UUID.UUID(), name: 'phone', price: 1500, promotion: false },
      { id: UUID.UUID(), name: 'camera', price: 1000, promotion: false },
    ];
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: UUID.UUID(),
        name: 'pc',
        price: 3500,
        promotion: false,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'camera',
        price: 1000,
        promotion: false,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'phone',
        price: 1500,
        promotion: false,
      });
    }
  }

  public getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }
  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size) totalPages++;
    let pageProduct = this.products.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProduct,
    });
  }
  public deleteProduct(index: string): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != index);
    console.log(this.products, 'ghid gan wwin service ');
    return of(true);
  }
  public setPromotion(p: Product): Observable<Product> {
    let index = this.products.indexOf(p);
    this.products[index].promotion = !this.products[index].promotion;
    return of(this.products[index]);
  }

  public searchProduct(
    keyword: string,
    page: number,
    size: number
  ): Observable<PageProduct> {
    let result = this.products.filter((p) => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(result.length / size);
    if (result.length % size) totalPages++;
    let pageProduct = result.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProduct,
    });
  }
}
