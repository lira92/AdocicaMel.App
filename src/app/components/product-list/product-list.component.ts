import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result.items;
      this.totalItems = result.totalCount;
    });
  }

  addToCart(product: any) {
    this.cartService.addItem({id: product.id, title: product.title, price: product.price, quantity: 1});
  }

  public requestAutoCompleteTags = (text: string): Observable<Response> => {
    return this.productService.getTags(text);
  }

  filter() {
    console.log(this.searchTags);
    this.productService.getProducts(this.searchName, this.searchTags.map(tag => tag.name), this.order)
      .subscribe(result => {
        this.products = result.items;
        this.totalItems = result.totalCount;
      });
  }
}
