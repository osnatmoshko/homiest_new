import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAs } from './about-as';

describe('AboutAs', () => {
  let component: AboutAs;
  let fixture: ComponentFixture<AboutAs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutAs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
