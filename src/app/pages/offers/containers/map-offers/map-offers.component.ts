import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as MapConfig from 'src/app/pages/offers/containers/map-offers/map-offers.config';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { DrawEvents, FeatureGroup } from 'leaflet';

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
      'Карта': MapConfig.OFFERS_OPEN_STREET_MAP,
      'Спутник': MapConfig.OFFERS_HYBRID_MAP
    },
    overlays: {
      // 'Vehicle': this.vehicleMarker
    }
  };

  drawnItems: FeatureGroup = L.featureGroup();

  drawOptions: L.Control.DrawConstructorOptions = {
    position: 'bottomleft',
    edit: {
      featureGroup: this.drawnItems
    },
    draw: {
      polyline: false,
      marker: false,
      circlemarker: false,
      circle: false,
      rectangle: false,
      polygon: {
        showArea: true
      }
    }
    // draw: {
    //       marker: {
    //         icon: L.icon({
    //           iconSize: [ 25, 41 ],
    //           iconAnchor: [ 13, 41 ],
    //           iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
    //           iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
    //           shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
    //         })
    //       },
    //       polyline: false,
    //       circle: {
    //         shapeOptions: {
    //           color: '#d4af37'
    //         }
    //       },
    //       rectangle: {
    //         shapeOptions: {
    //           color: '#85bb65'
    //         }
    //       }
    //     },
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

  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }

}
