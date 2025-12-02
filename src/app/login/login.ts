import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ← חובה ל-ngIf
import { CustomerService } from '../services/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ← הוסף CommonModule כאן
  templateUrl: './login.html'
})
export class Login {

  email: string = '';
  phone: string = '';
  errorMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';
    this.customerService.login(this.email, this.phone).subscribe({
      next: res => {
        localStorage.setItem('customer', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMessage = err.error || 'The user does not exist';
      }
    });
  }

  clearError() {
    this.errorMessage = '';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
