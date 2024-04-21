import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersStepsAccordionComponent } from './offers-steps-accordion.component';

describe('OffersStepsAccordionComponent', () => {
  let component: OffersStepsAccordionComponent;
  let fixture: ComponentFixture<OffersStepsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersStepsAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersStepsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
