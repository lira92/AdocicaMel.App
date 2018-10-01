import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: any[];
  public totalItems: Number = 0;
  public searchName = '';
  public searchTags: any[] = [];
  public order = '';
  @ViewChild('searchInput') input: ElementRef;

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result.items;
      this.totalItems = result.totalCount;
    });
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe(() => { this.filter(); });
  }

  addToCart(product: any) {
    this.cartService.addItem({id: product.id, title: product.title, price: product.price, quantity: 1});
  }

  public requestAutoCompleteTags = (text: string): Observable<Response> => {
    return this.productService.getTags(text);
  }

  filter() {
    this.productService.getProducts(this.searchName, this.searchTags.map(tag => tag.name), this.order)
      .subscribe(result => {
        this.products = result.items;
        this.totalItems = result.totalCount;
      });
  }
}
