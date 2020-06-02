import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';

    includeDetail = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    
    public get showImage(): boolean {
        return this.productParamService.showImage;
    }
    public set showImage(value: boolean) {
        this.productParamService.showImage = value;
    }

    @ViewChild(CriteriaComponent, {static: true, read: CriteriaComponent}) filterComponent: CriteriaComponent;

    constructor(private productService: ProductService,
                private productParamService: ProductParameterService) { }

    ngOnInit(): void {

        // this.filterCriteria.listFilter
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter =
                   this.productParamService.filterBy;
            },
            (error: any) => this.errorMessage =  error as any
        );
    }

    onValueChange(value: string): void {
        this.performFilter(value);
        this.productParamService.filterBy = value;
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
