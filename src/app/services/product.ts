import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    console.log('--- Products Component Constructor Loaded ---');
  }

  // כל המוצרים
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}Products`);
  }

  // מוצרים לפי קטגוריה
  getByCategory(category: string): Observable<any[]> {
    console.log('---הכתובת של הניתוב---');
    return this.http.get<any[]>(`${API_BASE_URL}Products/by-category/${encodeURIComponent(category)}`);
  }
  getById(id : number):  Observable<Product>{
    return this.http.get<Product>(`${API_BASE_URL}Products/by-id/${encodeURIComponent(id)}`);
  }
}
// http://localhost:5245/api/Products/by-category/Bedrooms
//קוד שעובד !!