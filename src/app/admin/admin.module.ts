import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { ImportProductPageComponent } from './pages/import-product-page/import-product-page.component';
import { AsideMenuComponent } from './components/shared/aside-menu/aside-menu.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AdminHomePageComponent, ImportProductPageComponent, AsideMenuComponent, HeadbarComponent]
})
export class AdminModule { }
