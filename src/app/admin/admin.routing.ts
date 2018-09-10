import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { ImportProductPageComponent } from './pages/import-product-page/import-product-page.component';

const adminRoutes: Routes = [
    {
      path: '',
      component: AdminHomePageComponent
    },
    {
      path: 'import-product',
      component: ImportProductPageComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
  
  