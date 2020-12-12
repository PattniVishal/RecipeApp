import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    console.log("OnInit in RecipesDetailsComponent");
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.recipeDetail = this.recipeService.getRecipeById(this.id);

          this.store.select('recipes')
          .pipe(
            map(recipesState => {
              console.log("RecipesState in RecipesDetailsComponent : ", recipesState);
              
              return recipesState.recipes.find((recipe, index) => {
                return index === this.id;
              });
            })
          )
          .subscribe(recipe => {
            this.recipeDetail = recipe;
          })
        }
      );
  }

  onAddToShoppingList(){
    // this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients));
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route});
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
