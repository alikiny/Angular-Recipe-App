import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from 'src/app/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {


  recipes: Recipe[]
  private deleteRecipe:Subscription
  

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
   ) { }
   

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes()
    this.recipes = this.recipeService.recipes
    this.deleteRecipe=this.recipeService.deleteRecipe.subscribe(
      (index)=>{
        this.recipeService.recipes.splice(index,1)
      }
    )

  }

  addNew() {
    const id='new'
    const name='recipe'

    this.router.navigate([`add-recipes/${id}/${name}`], { relativeTo: this.route })
  }

  ngOnDestroy(){
    this.deleteRecipe.unsubscribe()
  }



}
