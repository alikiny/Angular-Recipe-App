import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

@ViewChild('form') form:NgForm
subscription: Subscription
editMode=false
edittedItemIndex: number
edittedItem:Ingredient
dynamicButton='Add'

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppinglistService.editIngredient.subscribe(
      index=>{
        this.editMode=true
        this.edittedItemIndex=index
        this.edittedItem=this.shoppinglistService.ingredients[index]
        this.dynamicButton="Update"
        this.form.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount,
          unit: this.edittedItem.unit
        })
      }
    )
  }
  addIngredient(form: NgForm) {
    const value = form.value

    if(this.editMode){
      this.shoppinglistService.ingredients.splice(this.edittedItemIndex,1,new Ingredient(
        value.name,value.amount,value.unit
      ))
    }else{
      this.shoppinglistService.addIngredient(
        value.name,value.amount,value.unit
      )
    }

    this.editMode=false
    this.dynamicButton='Add'
    this.form.reset()

  }
  
  clearList() {
    for (var i = 0; i <= this.shoppinglistService.ingredients.length; i++) {
      this.shoppinglistService.ingredients.pop()
    }

  }

  

  onCancel(){
    this.form.reset()

    this.editMode=false
    this.dynamicButton='Add'

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
