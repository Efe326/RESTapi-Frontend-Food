import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { ViewFoodComponent } from './foods/view-food/view-food.component';
import { FoodAddComponent } from './food-add/food-add.component';
const routes: Routes = [
  {
    path:'',
    component: FoodsComponent
  },
  {
    path:'products',
    component: FoodsComponent
  },
  {
    path:'products/:_id',
    component: ViewFoodComponent
  },
  { path: 'add-food', 
    component: FoodAddComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
