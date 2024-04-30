import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import * as MapConfig from 'src/app/pages/offers/containers/map-offers/map-offers.config';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
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
  shown: boolean = false;

  layersControl = {
    baseLayers: {
      'Карта': MapConfig.OFFERS_OPEN_STREET_MAP,
      'Спутник': MapConfig.OFFERS_HYBRID_MAP
    },
    overlays: {
      //'Vehicle': MapConfig.OFFERS_OPEN_STREET_MAP
    }
  };

  drawnItems: FeatureGroup = L.featureGroup();

  drawOptions: L.Control.DrawConstructorOptions = {
    position: 'topleft',
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
        showArea: true,
        precision: { km: 0 },
        shapeOptions: {
                   // color: '#d4af37'
          stroke: true,
          color: '#3388ff',
          weight: 4,
          opacity: 0.5,
          fill: true,
          clickable: true
        }
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

  constructor(private _http: HttpClient) { }

  // constructor(

  // ) {
  //   super();
  // }

  ngOnInit() {
    this.initializeMapOptions()
  }


  private initializeMapOptions() {
    this.mapOptions = {
      center: L.latLng(46.705, -1.51),
      zoom: 10,
      layers: [
        MapConfig.OFFERS_OPEN_STREET_MAP
      ]
    };
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.map.setMaxBounds([[-90, -180], [90, 180]]);
    const provider = new OpenStreetMapProvider;
    const searchControl = GeoSearchControl({
      provider,
      style: 'bar',
      autoCompleteDelay: 300,
      showMarker: false,
      searchLabel: 'Поиск',
    });
    this.map.addControl(searchControl);

    this._http.get('assets/export_draw_30_04_2024.json').subscribe((json: any) => {
      console.log(json);
      // this.json = json;
      L.geoJSON(json).addTo(map);
    });
    // this._http.get('../../mocks/export_draw_30_04_2024.geojson').subscribe((json: any) => {
    //   // console.log(json);
    //   // this.json = json;
    //   L.geoJSON(json).addTo(map);
    // });
  }

  onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }

}
