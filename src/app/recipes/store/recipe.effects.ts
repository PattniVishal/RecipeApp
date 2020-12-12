import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Recipe } from "../recipe.model";

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffect {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>("https://recipe-app-73924.firebaseio.com/recipes.json");
        }),
        map((recipes) => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipe = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPE),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put("https://recipe-app-73924.firebaseio.com/recipes.json", recipesState.recipes);
            // .subscribe(response => {
            //     console.log("storeRecipes Response: ", response);
            // });
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}