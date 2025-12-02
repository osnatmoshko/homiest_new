import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { API_BASE_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // הרשמה
  register(customer: Customer): Observable<Customer> {
    // המרת birthDate ל-ISO string כדי שהAPI יבין
    const payload = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      birthDate: customer.birthDate.toISOString()
    };

    return this.http.post<Customer>(`${API_BASE_URL}Customer/register`, payload);
  }


//התחברות
login(email: string, phone: string): Observable<Customer> {
  const encodedEmail = encodeURIComponent(email);
  return this.http.post<Customer>(
    `${API_BASE_URL}Customer/login?email=${encodedEmail}&phone=${phone}`, {}
  );
}


  // הבאת לקוח לפי ID
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_BASE_URL}Customer/${id}`);
  }
}
