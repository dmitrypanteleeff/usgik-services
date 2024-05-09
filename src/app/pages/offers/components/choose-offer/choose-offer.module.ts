import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseOfferComponent } from './choose-offer.component';
import { TuiDataListModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiSelectModule, TuiSelectOptionModule } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { TuiLetModule, TuiPortalModule } from '@taiga-ui/cdk';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  exports: [ChooseOfferComponent],
  declarations: [
    ChooseOfferComponent
  ],
  imports: [
    CommonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiSelectOptionModule,
    TuiLoaderModule,
    TuiLetModule,
    TuiPortalModule,
    TuiSelectModule,
    NgxSkeletonLoaderModule,
    TuiSelectModule
  ]
})
export class ChooseOfferModule { }
