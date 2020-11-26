import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from '../recipes/recipes-detail/recipes-detail.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipesResolverService } from '../recipes/recipes-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const appRoutes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}