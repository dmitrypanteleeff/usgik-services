import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapOffersComponent } from './map-offers.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';



@NgModule({
  exports: [MapOffersComponent],
  declarations: [
    MapOffersComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
    LeafletDrawModule
  ]
})
export class MapOffersModule { }
