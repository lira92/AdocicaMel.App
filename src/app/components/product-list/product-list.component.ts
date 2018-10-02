import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: any[] = [];
  public totalItems: Number = 0;
  public searchName = '';
  public searchTags: any[] = [];
  public order = '';
  public loading = false;
  public loadingMore = false;
  public pageNumber = 1;
  @ViewChild('searchInput') input: ElementRef;

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe(result => {
      this.loading = false;
      this.products = result.items;
      this.totalItems = result.totalCount;
    });
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => { this.filter(); });
  }

  addToCart(product: any) {
    this.cartService.addItem({id: product.id, title: product.title, price: product.price, quantity: 1});
  }

  public requestAutoCompleteTags = (text: string): Observable<Response> => {
    return this.productService.getTags(text);
  }

  filter() {
    this.pageNumber = 1;
    this.productService.getProducts(this.searchName, this.searchTags.map(tag => tag.name), this.order)
      .subscribe(result => {
        this.products = result.items;
        this.totalItems = result.totalCount;
      });
  }

  loadMore() {
    this.loadingMore = true;
    this.pageNumber += 1;
    this.productService.getProducts(this.searchName, this.searchTags.map(tag => tag.name), this.order, this.pageNumber)
      .subscribe(result => {
        this.loadingMore = false;
        this.products = this.products.concat(result.items);
        this.totalItems = result.totalCount;
      });
  }
}
