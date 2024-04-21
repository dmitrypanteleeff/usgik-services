import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiContextWithImplicit, TuiStringHandler, tuiPure } from '@taiga-ui/cdk';
import { delay, of } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseOfferComponent {
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
  stringify(items: readonly Python[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));
    console.log(1111, map)

    return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}
