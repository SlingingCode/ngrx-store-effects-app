import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { of }  from 'rxjs/observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';

// @Injectable()
// export class PizzasEffects {
//   constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

//   @Effect()
//   loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
//     .pipe(
//       switchMap(() => {
//         return this.pizzaService.getPizzas().pipe(
//           map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)), catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
//         )
//       }));
// }



@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) { }



  @Effect()
  // Lyssna på dispath av action LOAD_TOPPINGS
  loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      // Läs upp toppings
      return this.toppingsService.getToppings()
        .pipe(
          // Dispatch lämplig action beroende på svaret från servern
          map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
          catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
        )
    })
  )
}
