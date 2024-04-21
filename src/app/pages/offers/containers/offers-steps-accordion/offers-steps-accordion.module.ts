import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersStepsAccordionComponent } from './offers-steps-accordion.component';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { ChooseOfferModule } from '../../components/choose-offer/choose-offer.module';



@NgModule({
  exports: [OffersStepsAccordionComponent],
  declarations: [
    OffersStepsAccordionComponent
  ],
  imports: [
    CommonModule,
    TuiAccordionModule,
    ChooseOfferModule
  ]
})
export class OffersStepsAccordionModule { }
