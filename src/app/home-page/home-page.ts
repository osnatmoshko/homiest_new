import { Component } from '@angular/core';
import { MainCatalog } from '../main-catalog/main-catalog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainCatalog],
  templateUrl: './home-page.html',
})
export class HomePage {

}
