import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';
import { Product } from '../models/product';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './single-product.html',
})
export class SingleProduct implements OnInit {
  product!: Product;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router,
    private servCart: CartService,
    private zone: NgZone // ← הוספה כאן
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.service.getById(id).subscribe(product => {
        this.product = product;
      });
    });
  }

  back() {
    this.router.navigate(['/products', this.product.categoryName]);
  }

  addCart(idProduct: number) {
    const customerStr = localStorage.getItem('customer');

    if (!customerStr) {
      this.message = 'You are not logged in! Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    const customerObj = JSON.parse(customerStr);
    const idCustomer = customerObj.id;

    if (!idCustomer) {
      this.message = 'You are not logged in! Redirecting to login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
      return;
    }

    this.servCart.addToTheCart(idCustomer, idProduct).subscribe(() => {
      this.message = 'Added to cart!';

      // שימוש ב-NgZone כדי Angular יעדכן את ה-view
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.message = '';
          });
        }, 2000);
      });
    });
  }
}
