// import { Routes } from '@angular/router';
// import { HomePage } from './home-page/home-page';
// import { MainCatalog } from './main-catalog/main-catalog';
// import { ShoppingCart } from './shopping-cart/shopping-cart';
// import { AboutAs } from './about-as/about-as';
// import { Login } from './login/login';
// import { Products } from './products/products';

// export const routes: Routes = [
//   { path: '', component: HomePage },  
//   { path: 'home-page', component: HomePage },
//   { path: 'main-catalog', component: MainCatalog },
//   { path: 'cart', component: ShoppingCart },
//   { path: 'about', component: AboutAs },
//   { path: 'login', component: Login },
//   { path: '**', redirectTo: '' } ,
//   { path: 'products', component: Products },
//   { path: 'products/:category', component: Products }

// ];
import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { MainCatalog } from './main-catalog/main-catalog';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { AboutAs } from './about-as/about-as';
import { Login } from './login/login';
import { Products } from './products/products'; 
import { SingleProduct } from './single-product/single-product';
import { Register} from './register/register'

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'home-page', component: HomePage },
  { path: 'main-catalog', component: MainCatalog },
  { path: 'cart', component: ShoppingCart },
  { path: 'about', component: AboutAs },
  { path: 'login', component: Login },
  { path: 'products', component: Products },
  { path: 'products/:category', component: Products },
  {path: 'single-product/:id', component: SingleProduct},
  {path: 'register', component: Register},
  { path: '**', redirectTo: '' } 
];
