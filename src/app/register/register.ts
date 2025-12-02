import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../services/customer';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html'
})
export class Register {
  today: string = new Date().toISOString().split('T')[0];

  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: new Date()
  };

  successMessage: string = '';
  errorMessage: string = '';
  showLoginButton: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  register(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    this.showLoginButton = false;

    if (!form.valid) {
      // Show a general error message — individual fields show their own messages
      this.errorMessage = 'Please fix the highlighted fields before submitting.';
      return;
    }

    if (typeof this.customer.birthDate === 'string') {
      this.customer.birthDate = new Date(this.customer.birthDate);
    }

    this.customerService.register(this.customer).subscribe({
      next: res => {
        this.successMessage = 'Successfully registered!';
        localStorage.setItem('customer', JSON.stringify(res));
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.errorMessage = 'This email is already registered.';
        this.showLoginButton = true;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
