import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products:any[];

  constructor(private productService:ProductService, private cartService:CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    })
  }

  addToCart(product:any) {
    this.cartService.addItem({id: product.id, title: product.title, price: product.price, quantity: 1});
  }

}
