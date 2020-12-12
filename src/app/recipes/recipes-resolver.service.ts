import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';  
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService,
                private recipesService: RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // const recipes = this.recipesService.getRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                console.log("RecipeResolver started");
                
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length === 0){
                    console.log("RecipeStore does not have Recipes");
                    
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                }
                else{
                    console.log("RecipeStore already have Recipes");
                    
                    return of(recipes);
                }
            })
        );
        // if(recipes.length === 0){
        //     return this.dataStorageService.fetchRecipes();
            
        // }
        // else{
        //     return recipes;
        // }
    }
}