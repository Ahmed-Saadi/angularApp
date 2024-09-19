import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Observer } from 'rxjs';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products!: Product[];
  errorMessage!: String;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.handleGetAllProducts();
    console.log('this happend ');
  }

  handleGetAllProducts() {
    this.service.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  handleDeleteProduct(p: Product) {
    let conf = confirm("are u sure maaann")
    if(!conf) return ;
    this.service.deleteProduct(p.id).subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
    });
  }
}
