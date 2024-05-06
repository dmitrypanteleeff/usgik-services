import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self
} from '@angular/core';
import * as L from 'leaflet';
import * as MapConfig from 'src/app/pages/offers/containers/map-offers/map-offers.config';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { DrawEvents, FeatureGroup } from 'leaflet';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { OffersAction } from '../../state/offers.action';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil, delay } from 'rxjs';

@Component({
  selector: 'usgik-map-offers',
  templateUrl: './map-offers.component.html',
  styleUrls: ['./map-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
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

  constructor(
    @Self()
    @Inject(TuiDestroyService)
    private readonly destroy$: TuiDestroyService,
    private readonly _actions: Actions,
    private readonly _store: Store,
  ) { }

  ngOnInit() {
    this.initializeMapOptions()
    this.initSubscription();
  }

  private initSubscription() {
    this._actions
      .pipe(
        ofActionSuccessful(OffersAction.LoadFeatureCollectionSuccess),
        delay(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(json => L.geoJSON(json.payload).addTo(this.map));
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

    this._store.dispatch(new OffersAction.LoadFeatureCollection);
  }

  onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }
}
