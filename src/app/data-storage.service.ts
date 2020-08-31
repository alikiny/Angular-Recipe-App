import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeServies: RecipeService) { }

  saveRecipes() {
    const recipes= this.recipeServies.recipes

    //http request wont be sent as long as it's subscribed or return a promise, then subscribe later
    this.http
    .put('https://thenycode-recipe.firebaseio.com/recipes.json',recipes)
    .subscribe(response=>{
      console.log(response)
    })
  }

  fetchRecipes(){
    this.http
    .get<Recipe[]>('https://thenycode-recipe.firebaseio.com/recipes.json')
    .subscribe(recipes=>{
      this.recipeServies.recipes=recipes.slice()
    })
  }
}
