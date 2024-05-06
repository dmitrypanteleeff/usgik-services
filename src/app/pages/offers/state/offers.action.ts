import * as geojson from 'geojson';

export namespace OffersAction {
  /* Ошибка */
  export class Error {
    static readonly type = '[OFFERS page] Error';
    constructor(public readonly payload: Request) { }
  }

  /* Сброс хранилища */
  export class Reset {
    static readonly type = '[OFFERS page] Reset';
    constructor() { }
  }

  /* Сброс слоя с картой */
  export class ResetFeatureCollection {
    static readonly type = '[OFFERS page] Reset Feature Collection';
    constructor() { }
  }

  /* Загрузка слоя с картой */
  export class LoadFeatureCollection {
    static readonly type = '[OFFERS page] Load Feature Collection';
    constructor() { }
  }

  /* Успешная загрузка слоя с картой */
  export class LoadFeatureCollectionSuccess {
    static readonly type = '[OFFERS page] Load Feature Collection Success';
    constructor(public readonly payload: geojson.GeoJsonObject | geojson.GeoJsonObject[] | undefined) { }
  }

  /* Ошибка загрузки слоя с картой */
  export class LoadFeatureCollectionError {
    static readonly type = '[OFFERS page] Load Feature Collection Error';
    constructor(public readonly payload: Request) { }
  }
}
