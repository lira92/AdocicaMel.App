import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: any[] = [];
  cartChange: Observable<any>;
  cartChangeObserver: Observer<any>;

  constructor() {
    this.cartChange = new Observable((observer: Observer<any>) => {
      this.cartChangeObserver = observer;
    });
  }

  addItem(item) {
    this.getItems();
    if (this.hasItem(item.id)) {
        this.updateQuantity(item.id, 1);
    } else {
        this.items.push(item);
    }
    localStorage.setItem('adocicamel.cart', JSON.stringify(this.items));
    this.cartChangeObserver.next(this.items);
  }

  updateQuantity(id, quantity) {
    for (const i of this.items) {
        if (i.id === id) {
            i.quantity += +quantity;
        }
    }
    this.cartChangeObserver.next(this.items);
  }

  getItems(): any[] {
    const data = localStorage.getItem('adocicamel.cart');
    if (data) {
        this.items = JSON.parse(data);
    }
    this.cartChangeObserver.next(this.items);
    return this.items;
  }

  hasItem(id): boolean {
    for (const i of this.items) {
        if (i.id === id) {
            return true;
        }
    }
    this.cartChangeObserver.next(this.items);
    return false;
  }

  removeItem(id: string) {
    for (const item of this.items) {
        if (item.id === id) {
            const index = this.items.indexOf(item);
            this.items.splice(index, 1);
        }
    }

    this.save();

    this.cartChangeObserver.next(this.items);
  }

  save() {
    localStorage.setItem('adocicamel.cart', JSON.stringify(this.items));
  }

  load() {
    const data = localStorage.getItem('adocicamel.cart');
    if (data) {
        this.items = JSON.parse(data);
    }
    this.cartChangeObserver.next(this.items);
  }

  clear() {
    this.items = [];
    this.removeItem('adocicamel.cart');
    this.cartChangeObserver.next(this.items);
  }

  getSubTotal(): number {
    let result = 0;
    for (const i of this.items) {
        result += +(+i.price * +i.quantity);
    }
    this.cartChangeObserver.next(this.items);
    return result;
  }
}
