import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as MapConfig from 'src/app/pages/offers/containers/map-offers/map-offers.config';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'usgik-map-offers',
  templateUrl: './map-offers.component.html',
  styleUrls: ['./map-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapOffersComponent implements OnInit {

  map!: L.Map;
  mapOptions!: L.MapOptions;
  provider: any;

  layersControl = {
    baseLayers: {
      'Cartographic map': MapConfig.OFFERS_OPEN_STREET_MAP,
      'Map view': MapConfig.OFFERS_HYBRID_MAP
    },
    overlays: {
      // 'Vehicle': this.vehicleMarker
    }
  };

  // constructor(

  // ) {
  //   super();
  // }

  ngOnInit() {
    this.initializeMapOptions()
  }


  private initializeMapOptions() {
    this.mapOptions = {
      center: L.latLng(51.505, 14.01),
      zoom: 12,
      layers: [
        MapConfig.OFFERS_OPEN_STREET_MAP
      ]
    };
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.setMaxBounds([[-90, -180], [90, 180]]);
    // const provider = new BingProvider({
    //   params: {
    //     key: environment.bingApiKey,
    //   },
    // });
    const provider = new OpenStreetMapProvider;
    this.map.zoomControl.remove();
    this.provider = provider;
  }

}
