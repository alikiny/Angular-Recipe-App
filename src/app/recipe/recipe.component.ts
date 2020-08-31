import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model'
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
 selectedRecipe:Recipe
 index:number
  constructor(
    private recipeService:RecipeService,
    private activeRoute:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this.recipeService.currentIndex>=0){
      console.log(this.recipeService.currentIndex)
      this.router.navigate([this.recipeService.currentIndex],{relativeTo:this.activeRoute})
    }
    
  }

}
