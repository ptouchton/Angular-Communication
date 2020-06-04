import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle = 'Product Detail';
    sub: Subscription;
    product: IProduct | null;
    constructor(private productService: ProductService) { }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.product = selectedProduct
        );
    }

}
