import { Component, Input, ViewChild } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchComponent } from '../shared/search/search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product.container',
  standalone: true,
  imports: [SearchComponent, ProductListComponent, ProductDetailComponent, CommonModule],
  templateUrl: './product.container.component.html',
  styleUrl: './product.container.component.scss'
})
export class ProductContainerComponent {
  @Input() searchText: string = '';
  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;
 
  onSearchInputChange(searchText: string) {
    debugger;
    this.searchText = searchText;
  }

}
