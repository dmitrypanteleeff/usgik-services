import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersStepsAccordionComponent } from './offers-steps-accordion.component';
import { TuiAccordionModule } from '@taiga-ui/kit';



@NgModule({
  exports: [OffersStepsAccordionComponent],
  declarations: [
    OffersStepsAccordionComponent
  ],
  imports: [
    CommonModule,
    TuiAccordionModule,
  ]
})
export class OffersStepsAccordionModule { }
