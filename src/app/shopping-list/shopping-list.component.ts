import { Component, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit  {

  constructor(private shoppinglistService: ShoppingListService) { }

  ingredients:Ingredient[]


  ngOnInit() {
    this.ingredients = this.shoppinglistService.ingredients
  }

  onEdit(i:number){
    this.shoppinglistService.editIngredient.next(i)
    //this is subscribed in the shopping-edit
  }

  chooseToDelete(index:number){
    let check=confirm("Do you want to delete this item?")
    if(check){
      this.shoppinglistService.onDelete(index)
    }
  }
}
