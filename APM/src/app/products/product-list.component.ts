import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle = 'Product List';
    showImage: boolean;
    includeDetail = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    parentListFilter: string;

    @ViewChild('filterCriteria') filterCriteria: CriteriaComponent;

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterCriteria.listFilter;
    }

    ngOnInit(): void {

        // this.filterCriteria.listFilter
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage =  error as any
        );
    }

    onValueChange(value: string): void {
        this.performFilter(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
