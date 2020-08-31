import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from './shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredient = new Subject<Ingredient>()
  editIngredient= new Subject<number>()
  ingredients:Ingredient[]=[]
  nameList:string[]=[]

  addIngredient(name:string,amount:number,unit:string) {
    
    this.newIngredient.next(new Ingredient(name,amount,unit))
    console.log("Emitted new event")

  }

  onDelete(index:number){
    this.ingredients.splice(index,1)
  }


  constructor() { }

  
}
