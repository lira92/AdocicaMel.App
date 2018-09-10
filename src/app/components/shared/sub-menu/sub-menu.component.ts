import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {
  public totalItems:Number = 0;
  public user:string = '';

  constructor(private cartService:CartService, private router:Router) {
    this.cartService.cartChange.subscribe((data) => {
      this.totalItems = data.length;
    })

    var data:any = JSON.parse(localStorage.getItem('adocicamel.user'));
    if(data) {
      this.user = data.name;
    }

    this.cartService.load();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('adocicamel.token');
    localStorage.removeItem('adocicamel.user');
    this.router.navigateByUrl('/login');
  }
}
