import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(private productService: ProductService, private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    // unsubscribe com takeWhile é para casos onde async pipe não pode ser aplicado
    // this.store.pipe(select(fromProduct.getProducts),
    //   takeWhile(() => this.componentActive))
    //   .subscribe(
    //     products => this.products = products
    // );
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
    this.store.dispatch(new productActions.Load());
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(currentProduct: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(currentProduct));
  }

}
