import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Routes
import {AppRoutingModule} from './app.routing';

// Root
import { AppComponent } from './app.component';

// Pages
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

// Shared
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';

// Components
import { ProductListComponent } from './components/product-list/product-list.component';

// Services
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    FooterComponent,
    HeadbarComponent,
    SubMenuComponent,
    ProductListComponent,
    SignupPageComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    TagInputModule,
  ],
  providers: [CartService, AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
