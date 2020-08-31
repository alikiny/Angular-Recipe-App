import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddnewComponent } from './addnew/addnew.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { StartPageComponent } from './recipe/start-page/start-page.component';

const routes: Routes = [
    {path:'',component:HomepageComponent},
    {path:'recipes',component:RecipeComponent,children:[
        {path:'',component:StartPageComponent},
        {path:':id',component:RecipeDetailComponent}
    ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path:'recipes/add-recipes/:id/:name',component:AddnewComponent},
    {path:'404',component:PageNotFoundComponent},
    {path:'**',redirectTo:'/404'}

  ]

@NgModule({
imports:[
    RouterModule.forRoot(routes)
],
exports:[
    RouterModule
]
})
export class AppRoutingModule{

}