// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-main-catalog',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './main-catalog.html',
// })
// export class MainCatalog {
//   constructor(private router: Router) {}

//   goToCategory(category: string) {
//     this.router.navigate(['/products', category]);
// }
// }
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-catalog.html',
})
export class MainCatalog {
  constructor(private router: Router) {}

  goToCategory(category: string) {
    console.log(category)
    this.router.navigate(['/products', category]);
  }
}

