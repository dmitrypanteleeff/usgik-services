import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapOffersComponent } from './map-offers.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  exports: [MapOffersComponent],
  declarations: [
    MapOffersComponent
  ],
  imports: [
    CommonModule,
    LeafletModule
  ]
})
export class MapOffersModule { }
