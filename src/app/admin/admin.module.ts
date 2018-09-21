import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { ImportProductPageComponent } from './pages/import-product-page/import-product-page.component';
import { AsideMenuComponent } from './components/shared/aside-menu/aside-menu.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    TagInputModule,
  ],
  declarations: [AdminHomePageComponent, ImportProductPageComponent, AsideMenuComponent, HeadbarComponent]
})
export class AdminModule { }
