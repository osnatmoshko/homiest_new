import { Component, Renderer2, ElementRef, OnInit, NgZone, Inject, PLATFORM_ID, Injectable } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '../services/cart'; 
import { CartItem } from '../models/cartItem';
import { ProductService } from '../services/product';

@Injectable({
  providedIn: 'root'
})
class ProductCacheService {
  private productCache: Map<number, any> = new Map();

  getProduct(id: number): any {
    return this.productCache.get(id);
  }

  setProduct(id: number, product: any): void {
    this.productCache.set(id, product);
  }

  hasProduct(id: number): boolean {
    return this.productCache.has(id);
  }
} 

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.html',
})
export class ShoppingCart implements OnInit {
  message: string = ''; 
  purchaseNotes: string = ''; 
  showCart: CartItem[] = [];
  totalAmount: number = 0;
  isLoggedIn: boolean = false;
  purchaseCompleted: boolean = false;


  constructor(
    private service: CartService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private ngZone: NgZone,
    private productService: ProductService,
    private location: Location,
    private productCache: ProductCacheService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const customerStr = localStorage.getItem('customer');
    if (!customerStr) {
      this.createLoginButton();
      return;
    }

    const customerObj = JSON.parse(customerStr);
    const id = customerObj.id;
    if (!id || id <= 0) {
      this.createLoginButton();
      return;
    }

    this.isLoggedIn = true;
    this.loadCart();
  }

  loadCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const customerStr = localStorage.getItem('customer');
    if (!customerStr) return;
    const customerObj = JSON.parse(customerStr);
    const id = customerObj.id;

    this.service.getCart(id).subscribe({
      next: (cart) => {
        this.showCart = cart.items || [];
        this.loadProductImages();
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart:', err),
    });
  }

  loadProductImages(): void {
    this.showCart.forEach(item => {
      if (!this.productCache.hasProduct(item.productID)) {
        this.productService.getById(item.productID).subscribe({
          next: (product) => {
            this.productCache.setProduct(item.productID, product);
          },
          error: (err) => console.error('Error loading product:', err)
        });
      }
    });
  }

  calculateTotal(): void {
    this.totalAmount = this.showCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  createLoginButton(): void {
    const btn = this.renderer.createElement('button');
    const text = this.renderer.createText('Connect');

    this.renderer.appendChild(btn, text);
    this.renderer.appendChild(this.el.nativeElement, btn);

    this.renderer.listen(btn, 'click', () => {
      this.router.navigate(['/login']);
    });
  }

  private showTemporaryMessage(msg: string) {
    this.message = msg;
    this.ngZone.run(() => {
      setTimeout(() => this.message = '', 2000);
    });
  }

  deleteItem(productId: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const customerStr = localStorage.getItem('customer');
    if (!customerStr) return;
    const customerObj = JSON.parse(customerStr); 
    const idCustomer = customerObj.id;

    this.service.deleteFromCart(idCustomer, productId).subscribe({
      next: (res) => {
        this.showTemporaryMessage((res as any).message || 'Product removed successfully.');
        this.loadCart();
      },
      error: () => this.showTemporaryMessage('Error removing product.')
    });
  }

  addItem(idProduct: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const customerStr = localStorage.getItem('customer')!;
    const customerObj = JSON.parse(customerStr);
    const idCustomer = customerObj.id;

    this.service.addToTheCart(idCustomer, idProduct).subscribe({
      next: (res) => {
        this.showTemporaryMessage(res.message || 'Product added successfully.');
        this.loadCart();
      },
      error: (err) => this.showTemporaryMessage('Error adding product.')
    });
  }

  finishPurchase(): void {
  if (!isPlatformBrowser(this.platformId)) return;
  
  // בדיקת מגבלת מחיר
  if (this.totalAmount > 5000) {
    this.showTemporaryMessage('Maximum purchase limit is $5,000. Please reduce your cart total.');
    return;
  }

  const customerStr = localStorage.getItem('customer')!;
  const customerObj = JSON.parse(customerStr!);
  const customerId = customerObj.id;

  this.service.finishPurchase(customerId, this.purchaseNotes).subscribe({
    next: (res) => {
      // הצגת הודעת תודה עם אנימציה
      this.purchaseCompleted = true;
      this.message = '✓ Thank you! Your purchase was completed successfully.';
      this.purchaseNotes = '';
      // נווט אחרי 8 שניות
      setTimeout(() => {
        this.router.navigate(['/home-page']);
      }, 8000);
    },
    error: () => this.showTemporaryMessage('Error completing purchase.')
  });
}

  closeCart(): void {
    this.location.back();
  }

  getProductImage(item: CartItem): string {
    const product = this.productCache.getProduct(item.productID);
    if (product && product.imageURL) {
      return product.imageURL + '?v=' + (product.lastUpdated || Date.now());
    }
    // Fallback to a simple colored rectangle
    return 'data:image/svg+xml;charset=UTF-8,%3Csvg width="80" height="80" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="80" height="80" fill="%23F5F0E1"/%3E%3Ctext x="40" y="45" text-anchor="middle" fill="%23B8A88B" font-size="12"%3EImage%3C/text%3E%3C/svg%3E';
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
