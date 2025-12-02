import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
   
  }
getCart(customerId: number): Observable<any> {
  return this.http.get<any>(`${API_BASE_URL}Cart/${customerId}`);
}
addToTheCart(customerId: number, productID: number): Observable<any> {
  return this.http.post<any>(`${API_BASE_URL}Cart/add/${customerId}/${productID}`, {});
}
deleteFromCart(customerId: number, productID: number): Observable<any> {
  return this.http.post<any>(
    `${API_BASE_URL}Cart/DeleteProduct?customerId=${customerId}&productId=${productID}`,{});
}
finishPurchase(customerId: number, notes: string): Observable<any> {
  return this.http.post<any>(
    `${API_BASE_URL}Cart/finish?customerId=${customerId}&notes=${notes}`, 
    {}
  );
}
}
