import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list.service';
import { RecipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {



  constructor(private shoppingList: ShoppingListService,
    private recipeService: RecipeService,
    private activeRoute:ActivatedRoute,
    private router:Router
  ) { }

  recipe: Recipe 
  index: number

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params:Params)=>{
        this.index=+params['id']
        this.recipe=this.recipeService.recipes[+params['id']]
        this.recipeService.currentIndex=this.index
      }
    )
  
  }

  onEdit(){
    this.router.navigate([`../add-recipes/${this.index}/${this.recipe.name}`],{relativeTo:this.activeRoute})
   
    
  
  }

  openDropdown() {
    const isOpen = document.getElementById("dropdown-menu").style.display === "none" ? 'none' : 'block'
    document.getElementById("dropdown-menu").style.display = isOpen === "none" ? "block" : "none"
    document.getElementById("dropdown-menu").scrollIntoView()
  }

  addToList() {
    console.log(this.recipe)
    for (let ingre of this.recipe.ingredients) {
      this.shoppingList.addIngredient(ingre.name, ingre.amount, ingre.unit)
      console.log(ingre)
    }
    this.openDropdown()
    alert("Added new items to shopping list")
  }

  confirm() {
    let result = confirm("Do you want to delete this recipe?")
    if (result) {
      this.recipeService.deleteRecipe.next(this.index)
      //listen for this subscribe in the recipe-list component
      this.router.navigate(["recipes"])
    }
  }

}
