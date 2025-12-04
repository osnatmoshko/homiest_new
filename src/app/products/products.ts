import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { ProductService } from '../services/product';
import { CartService } from '../services/cart';
import { Product } from '../models/product';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule, RouterModule],
  templateUrl: './products.html',
})
export class Products implements OnInit {

  sliderOptions: Options = {
    floor: 0,
    ceil: 0,
    rightToLeft: true
  };

  allProduct: Product[] = [];
  filteredProducts: Product[] = [];
  minPrice!: number;
  maxPrice!: number;
  sortOrder: 'asc' | 'desc' | '' = '';

  message: string = ''; // הודעה ליד המוצר
  successProducts: Set<number> = new Set(); // מעקב אחר מוצרים שנוספו בהצלחה

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private servCart: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category')!;
      this.setCategoryHeader(category);
      
      this.service.getByCategory(category).subscribe({
        next: (data) => {
          this.allProduct = data;
          console.log("Loaded:", this.allProduct);

          const prices = this.allProduct.map(p => p.price);
          this.sliderOptions = {
            floor: Math.min(...prices),
            ceil: Math.max(...prices),
            rightToLeft: true
          };

          this.minPrice = this.sliderOptions.floor!;
          this.maxPrice = this.sliderOptions.ceil!;

          this.applyFilters();
        },
        error: (err) => console.error('API failed:', err)
      });
    });
  }

  setCategoryHeader(category: string): void {
    const categoryImages: {[key: string]: string} = {
      'Living Rooms': 'assets/pic/living-room-main-catalog.jpeg',
      'Bedrooms': 'assets/pic/bed-room-main-catalog.jpg',
      'Kitchens': 'assets/pic/kitchen-main-catalot.jpg'
    };

    const titleElement = document.getElementById('categoryTitle');
    const imageElement = document.getElementById('categoryImage') as HTMLImageElement;
    
    if (titleElement) titleElement.textContent = category;
    if (imageElement) imageElement.src = categoryImages[category] || '';
  }

  applyFilters(): void {
    let result = [...this.allProduct];

    // סינון לפי מחיר
    result = result.filter(p =>
      p.price >= this.minPrice && p.price <= this.maxPrice
    );

    // מיון רגיל לפי מחיר
    if (this.sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;

    // מיון מותאם אישית לפי גיל הלקוח
    this.applyCustomerAgeSorting();
  }

  singleProduct(id: number){
    this.router.navigate(['/single-product', id]);
  }

  
addCart(idProduct: number) {
  const customerStr = localStorage.getItem('customer');

  if (!customerStr) {
    this.message = 'You are not logged in! Redirecting to login...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
  }

  const customerObj: Customer = JSON.parse(customerStr);
  const idCustomer = customerObj.id;

  if (!idCustomer) {
    this.message = 'You are not logged in! Redirecting to login...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
    return;
  }

  this.servCart.addToTheCart(idCustomer, idProduct).subscribe({
    next: (res) => {
      // הצג אנימציית הצלחה למוצר ספציפי
      this.successProducts.add(idProduct);
      setTimeout(() => this.successProducts.delete(idProduct), 1500);
    },
    error: () => {
      // שגיאה בהוספה לסל
    }
  });
}

  backCatalog(){
    this.router.navigate(['/main-catalog']);
  }

  // ----------------------
  // מיון מותאם אישית לפי גיל
  // ----------------------
  getCustomerAge(): number {
    const customerStr = localStorage.getItem('customer');
    if (!customerStr) return 0;

    const customer: Customer = JSON.parse(customerStr);
    const birthDate = new Date(customer.birthDate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  applyCustomerAgeSorting(): void {
    const age = this.getCustomerAge();
    if (age === 0) return;

    if (age > 30) {
      // מעל גיל 30: מהמוצרים הישנים לחדשים
      this.filteredProducts.sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
    } else {
      // עד גיל 30: מהמוצרים החדשים לישנים
      this.filteredProducts.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    }
  }

  isProductSuccess(productId: number): boolean {
    return this.successProducts.has(productId);
  }

}
