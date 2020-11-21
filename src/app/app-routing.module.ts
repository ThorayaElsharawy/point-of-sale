import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';

const routes: Routes = [
  {
    path: 'units',
    component: UnitListComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'product-create',
    component: ProductCreateComponent
  },
  {
    path: 'product-edit/:id/:name',
    component: ProductEditComponent
  },
  {
    path: '',
    component: ProductListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
