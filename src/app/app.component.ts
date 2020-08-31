import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './shared/ingredient.model';
import { UserService } from './user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  loadedFeature:string
  title = 'Recipe';
  private addIngre:Subscription
  
  constructor(
    private shoppinglistService:ShoppingListService,
    private user:UserService,
    ){}

  ingredients: Ingredient[]

  nameList:string[]

  ngOnInit() {
    this.ingredients=this.shoppinglistService.ingredients
    this.nameList=this.shoppinglistService.nameList

//change user info. Changing wont work if just set the new value. Must be a function
    this.user.changeEvent.subscribe(
      (changes)=>{
        this.user.info={
          id:changes.id,
          name:changes.name
        }
      
      }
    )
    


    //Add new ingredient to shopping list
    this.addIngre=this.shoppinglistService.newIngredient.subscribe(
      (newIng:Ingredient)=>{
        if(!this.shoppinglistService.nameList.includes(newIng.name.toLowerCase())){
          this.shoppinglistService.ingredients.push(newIng)
          this.shoppinglistService.nameList.push(newIng.name.toLowerCase())
        }else{
          this.shoppinglistService.ingredients=this.shoppinglistService.ingredients.filter(
            (ingre)=>ingre.name.toLowerCase()!=newIng.name.toLowerCase())
      
          this.shoppinglistService.ingredients.push(newIng)
          
        }
     
      }
    )

  }

ngOnDestroy(){
  this.addIngre.unsubscribe()
}
   
}

