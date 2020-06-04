import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  sub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage =  error as any
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
}
  onSelected(selectedProduct: IProduct ) {
    this.productService.changeSelectedProduct(selectedProduct);
  }

}
