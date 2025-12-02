import { Component, Renderer2, ElementRef, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart'; 
import { CartItem } from '../models/cartItem'; 

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

  constructor(
    private service: CartService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
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
    const customerStr = localStorage.getItem('customer');
    if (!customerStr) return;
    const customerObj = JSON.parse(customerStr);
    const id = customerObj.id;

    this.service.getCart(id).subscribe({
      next: (cart) => {
        this.showCart = cart.items || [];
        this.calculateTotal();
      },
      error: (err) => console.error('Error loading cart:', err),
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
  const customerStr = localStorage.getItem('customer')!;
  const customerObj = JSON.parse(customerStr!);
  const customerId = customerObj.id;

  this.service.finishPurchase(customerId, this.purchaseNotes).subscribe({
    next: (res) => {
      // הצגת הודעה תודה באנגלית
      this.showTemporaryMessage('Thank you! Your purchase was completed successfully.');
      this.purchaseNotes = '';
      this.loadCart();
      // נווט אחרי 2 שניות
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    },
    error: () => this.showTemporaryMessage('Error completing purchase.')
  });
}

}
