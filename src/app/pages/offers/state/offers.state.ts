import { Injectable, NgModule } from '@angular/core';
import { Action,
  NgxsModule,
   NgxsOnInit,
  Selector,
  State,
  StateContext
} from '@ngxs/store';
import { OfferStep } from '../models/offers-step.type';
//import { OptionsModel } from '../types/options.interface';
import { OffersAction } from './offers.action';
import { OffersApiService } from '../services/offers-api.service';
import { catchError, delay, tap } from 'rxjs';
//import { CityModel } from '../types/cities.interface';

export interface OfferStateModel {
  step: OfferStep,
  loadFeatureCollection: boolean,
  orderList: unknown[]
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    step: 'offers',
    loadFeatureCollection: false,
    orderList: []
  }
})

@Injectable()
export class OfferState {

  constructor(private readonly _api: OffersApiService) {}

  @Selector()
  static step$(state: OfferStateModel): OfferStep {
    return state.step;
  }

  @Selector()
  static loadFeatureCollection$(state: OfferStateModel): boolean {
    return state.loadFeatureCollection;
  }

  @Selector()
  static orderList$(state: OfferStateModel): any[] {
    return state.orderList;
  }

  @Action(OffersAction.LoadFeatureCollection)
  LoadFeatureCollection(ctx: StateContext<OfferStateModel>) {
    return this._api.LoadFeatureCollection()
      .pipe(
        tap((res) => ctx.dispatch(new OffersAction.LoadFeatureCollectionSuccess(res)) ),
        catchError(error => ctx.dispatch(new OffersAction.LoadFeatureCollectionError(error))))
  }


  @Action(OffersAction.LoadFeatureCollectionSuccess)
  LoadFeatureCollectionSuccess(ctx: StateContext<OfferStateModel>, { payload }: OffersAction.LoadFeatureCollectionSuccess) {
    ctx.patchState({
      loadFeatureCollection: true
    })
  }

  @Action(OffersAction.LoadFeatureCollectionError)
  LoadFeatureCollectionError(ctx: StateContext<OfferStateModel>, { payload }: OffersAction.LoadFeatureCollectionError) {
    ctx.patchState({
      loadFeatureCollection: false
    })
    ctx.dispatch(new OffersAction.Error(payload));
  }

  @Action(OffersAction.LoadOffersList)
  LoadOffersList(ctx: StateContext<OfferStateModel>) {
    return this._api.LoadOffersList()
      .pipe(
        delay(2000),
        tap((res) => ctx.dispatch(new OffersAction.LoadOffersListSuccess(res)) ),
        catchError(error => ctx.dispatch(new OffersAction.LoadFeatureCollectionError(error))))
  }

  @Action(OffersAction.LoadOffersListSuccess)
  LoadOffersListSuccess(ctx: StateContext<OfferStateModel>, { payload }: OffersAction.LoadOffersListSuccess) {
    let data = payload as any;
    console.log(11111, data.data)
    ctx.patchState({
      orderList: data.data
    })
  }

  @Action(OffersAction.LoadOffersListError)
  LoadOffersListError(ctx: StateContext<OfferStateModel>, { payload }: OffersAction.LoadOffersListError) {
    ctx.patchState({
      orderList: []
    })
    ctx.dispatch(new OffersAction.Error(payload));
  }

  @Action(OffersAction.Error)
  Error(ctx: StateContext<OfferStateModel>, { payload }: OffersAction.Error) {
    console.log('Error')
  }
}
