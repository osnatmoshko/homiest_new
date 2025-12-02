import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCatalog } from './main-catalog';

describe('MainCatalog', () => {
  let component: MainCatalog;
  let fixture: ComponentFixture<MainCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
