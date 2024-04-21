import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { RouterModule, Routes } from '@angular/router';
import { MapOffersModule } from './containers/map-offers/map-offers.module';
import { OffersStepsAccordionModule } from './containers/offers-steps-accordion/offers-steps-accordion.module';


const routes: Routes = [{ path: '', component: OffersComponent }]



@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MapOffersModule,
    OffersStepsAccordionModule
  ],
  exports: [RouterModule]
})
export class OffersModule { }
