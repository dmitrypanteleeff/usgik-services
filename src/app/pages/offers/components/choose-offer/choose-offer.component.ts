import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self
} from '@angular/core';
import { Actions, Select, Store } from '@ngxs/store';
import {
  TuiContextWithImplicit,
  TuiDestroyService,
  TuiStringHandler,
  tuiPure
} from '@taiga-ui/cdk';
import {
  Observable,
  combineLatest,
  delay,
  filter,
  map,
  of,
  tap
} from 'rxjs';
import { OffersAction } from '../../state/offers.action';
import { OfferState } from '../../state/offers.state';

interface Python {
  readonly id: number;
  readonly name: string;
}

const ITEMS: readonly Python[] = [
  {id: 42, name: 'John Cleese'},
  {id: 237, name: 'Eric Idle'},
  {id: 666, name: 'Michael Palin'},
  {id: 123, name: 'Terry Gilliam'},
  {id: 777, name: 'Terry Jones'},
  {id: 999, name: 'Graham Chapman'},
];


@Component({
  selector: 'usgik-choose-offer',
  templateUrl: './choose-offer.component.html',
  styleUrls: ['./choose-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ChooseOfferComponent implements OnInit {

  @Select(OfferState.orderList$) orderList$!: Observable<any[]>;

  constructor(
    @Self()
    @Inject(TuiDestroyService)
    private readonly destroy$: TuiDestroyService,
    private readonly _actions: Actions,
    private readonly _store: Store,
  ) { }

  loading$!: Observable<boolean>;


  ngOnInit(): void {
    this.initSubscription();
    this._store.dispatch(new OffersAction.LoadOffersList);
  }

  private initSubscription() {
    this.loading$ = combineLatest([
      this.orderList$.pipe(filter(Boolean))
    ])
      .pipe(tap(val => console.log('tap', typeof val)),map(item => !!item && item[0].length > 0));

    // this._actions
    //   .pipe(
    //     ofActionSuccessful(OffersAction.LoadFeatureCollectionSuccess),
    //     delay(1000),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe(json => L.geoJSON(json.payload).addTo(this.map));
  }

  groups: {items: { title: string}[], label: string }[] = [
    {
      items: [{ title: 'Заг 1'},{ title: 'Заг 2'}],
      label: 'Zasdas 1'
    },
    {
      items: [{ title: 'Заг 3'},{ title: 'Заг 4'}],
      label: 'Zasdas 2'
    },
  ]



  readonly pythons = [
    'de la Concordia «Gabo» García Márquez',
    'John Cleese',
    'Eric Idle',
    'Michael Palin',
    'Terry Gilliam',
    'Terry Jones',
    'Graham Chapman',
];

  //value = this.pythons[0];

  value = 42;

  // Server request for items imitation
  readonly items$ = of(ITEMS).pipe(delay(1000));

  @tuiPure
  stringify(items: readonly any[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({id, order}) => [id, order] as [number, string]));
    console.log(1111, map)

    return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }

  chooseOffer(item: any) {
    console.log(11111, 'chooseOffer', item.offer)
  }
}
