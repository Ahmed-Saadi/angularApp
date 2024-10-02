import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Observer } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products!: Product[];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPage: number = 0;
  errorMessage!: String;
  searchFormGroup!: FormGroup;
  isSearch : boolean =false ;

  constructor(private service: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null),
    });
    this.handleGetPageProducts();
  }

  handleGetPageProducts() {
    this.service.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data: PageProduct) => {
        this.products = data.products;
        this.totalPage = data.totalPages;
      },
    });
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
    let conf = confirm('are u sure maaann');
    if (!conf) return;
    this.service.deleteProduct(p.id).subscribe({
      next: (data: boolean) => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      },
    });
  }
  handlePromotion(p: Product) {
    const promotion: boolean = p.promotion;
    this.service.setPromotion(p).subscribe({
      next: (data: Product) => {
        p.promotion = !promotion;
      },
    });
  }

  handleSubmitForm() {
    this.isSearch = true;
    let keyword = this.searchFormGroup.value.keyword;
    this.service
      .searchProduct(keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPage = data.totalPages;
        },
      });
  }

  public gotoPage(index: number) {
    this.currentPage = index;
    if(this.isSearch){
      this.handleSubmitForm();
    }else{
      this.handleGetPageProducts();
    }
    
  }
}
