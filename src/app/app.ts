import { Component, signal , OnInit} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MainCatalog } from './main-catalog/main-catalog';
import { ShoppingCart } from './shopping-cart/shopping-cart';
import { Products } from './products/products';
import { AboutAs } from './about-as/about-as';
import { HomePage } from './home-page/home-page';
import { Login } from './login/login';
import { Register } from './register/register';
import { register } from 'module';
import { CartService } from './services/cart';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    RouterOutlet, 
    MainCatalog, 
    ShoppingCart, 
    Products, 
    AboutAs, 
    HomePage,
    Login,
    Register
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
 
}

