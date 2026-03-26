import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  @Input() productListComponent: ProductListComponent = undefined;
  product: ProductModel;

  ngOnInit(): void {
    this.product = this.productListComponent.selectedProduct;
  }
}
