import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  {
    path: 'restaurants',
    children:[{
      path:"",
      loadChildren: ()=> import("./restaurants/restaurant.module").then(m=> m.RestaurantPageModule)
    },
  {
    path:':restaurantID',
    loadChildren: ()=> import("./restaurants/restaurant-detail/restaurant-detail.module").then(m=>m.RestaurantDetailPageModule)
  }]}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
