import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  
  deleteRecipe=new Subject<number>()

  image='https://www.melissassouthernstylekitchen.com/wp-content/uploads/2019/02/SouthernFriedChicken002.jpg'

recipes:Recipe[]=[
    new Recipe(
      "Fried Chicken",
      'Crispy and Spicy',
      this.image,
      "Easy",
      40,
      [new Ingredient("Chicken",3,"kpl"),
    new Ingredient("Onion slide",1,"cup")],
    "It is a long established fact that a reader will\
     be distracted by the readable content of a page when \
     looking at its layout. The point of using Lorem Ipsum is that it\
      has a more-or-less normal distribution of letters, as opposed to using \
      'Content here, content here', making it look like readable English.\
       Many desktop publishing packages and web page editors now use Lorem \
       Ipsum as their default model text, and a search for 'lor\
        will uncover many web sites still in their infancy. Various \
        versions have evolved over the years, sometimes \
       by accident, sometimes on purpose (injected humour and the like)."),

    new Recipe(
      "Omlete Egg",
     'Crispy and Spicy',
     this.image,
     "Easy",
     40,
     [new Ingredient("Egg",3,"kpl"),
    new Ingredient("Minced beef",1,"cup")],
    "It is a long established fact that a reader will\
    be distracted by the readable content of a page when \
    looking at its layout. The point of using Lorem Ipsum is that it\
     has a more-or-less normal distribution of letters, as opposed to using \
     'Content here, content here', making it look like readable English.\
      Many desktop publishing packages and web page editors now use Lorem \
      Ipsum as their default model text, and a search for 'lor\
       will uncover many web sites still in their infancy. Various \
       versions have evolved over the years, sometimes \
      by accident, sometimes on purpose (injected humour and the like)."),
]

currentRecipe:Recipe
currentIndex:number

addRecipe(name,description,image,level,time,ingredients,process){
  const newRecipe=new Recipe(
    name,
    description,
    image,
    level,
    time,
    ingredients,
    process)

    this.recipes.push(newRecipe)
    return this.recipes
}

  constructor() { }
}
