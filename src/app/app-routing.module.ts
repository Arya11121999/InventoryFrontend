import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryPageComponent } from './pages/factory-page/factory-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: 'factory', component: FactoryPageComponent },
  // { path: 'product', component: ProductListComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'factory/:id',

    component: ProductListComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
