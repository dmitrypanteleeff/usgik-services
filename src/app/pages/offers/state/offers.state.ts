import { Injectable, NgModule } from '@angular/core';
import { Action, NgxsModule, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { OfferStep } from '../models/offers-step.type';
//import { OptionsModel } from '../types/options.interface';
import { OffersAction } from './offers.action';
import { OffersApiService } from '../services/offers-api.service';
import { catchError, tap } from 'rxjs';
//import { CityModel } from '../types/cities.interface';

export interface OfferStateModel {
  step: OfferStep,
  loadFeatureCollection: boolean
}

@State<OfferStateModel>({
  name: 'offer',
  defaults: {
    step: 'offers',
    loadFeatureCollection: false
  }
})

@Injectable()
export class OfferState {

  constructor(private readonly _api: OffersApiService) {

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
    ctx.dispatch(new OffersAction.Error(payload))
  }

  // @Action(ResetGameAction)
  // ResetGameAction(ctx: StateContext<GameStateModel>, action: ResetGameAction) {
  //   const { name } = action;
  //   if (!name) { return; }

  //   const state = ctx.getState();

  //   console.log(222222, name)

  //   ctx.setState({
  //     ...state,
  //     options: {
  //       ...state.options,
  //       score: 0
  //     }
  //   })

  //   console.log(state.options)
  // }

}

// @NgModule({
//   imports: [NgxsModule.forFeature([OfferState])]
// })
// export class OfferStateModule {
// }
