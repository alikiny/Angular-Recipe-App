import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../recipe/recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  ingredients: Ingredient[] = []
  ingredientControl: FormArray
  newRecipe: Recipe
  canAddNew = false

  id: string
  name: string = undefined
  isEditted: Boolean = false

  addForm: FormGroup

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService:DataStorageService,
    private http: HttpClient) { }
  
  

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.name = params['name']
      }
    )

    /* check if the available recipe has ingredients, if true, push each ingredient as a FormGroup to the FormArray */
    this.ingredientControl = new FormArray([])

    /* If the param 'id' is not 'new', meaning this route come from 'edit' button in the recipe detail,
    rather than the 'new' button in the recipe list */
    if (this.route.snapshot.params['id'] !== 'new') {
      this.newRecipe = this.recipeService.recipes[this.route.snapshot.params['id']]
      if (this.newRecipe.ingredients.length > 0) {


        for (let i of this.newRecipe.ingredients) {
          let item = new FormGroup({
            ingredientName: new FormControl(i.name, Validators.required),
            ingredientAmount: new FormControl(
              i.amount,
              [Validators.required, Validators.pattern(/^[0-9]\.[0-9]*$|^[1-9]+\.?[0-9]*$/)]),
            ingredientUnit: new FormControl(i.unit, Validators.required),
          })

          this.ingredientControl.push(item)
        }
      }
      this.isEditted = true
    }else{
      this.newRecipe=new Recipe(null,null,null,null,null,null,null)
    }

    



    /* initiate addForm */
    this.addForm = new FormGroup(
      {
        recipeName: new FormControl(null, Validators.required),
        recipeDescription: new FormControl(null, Validators.required),
        recipeImage: new FormControl(null, Validators.required),
        recipeLevel: new FormControl(null, Validators.required),
        recipeTime: new FormControl(null, Validators.required),
        recipeProcess: new FormControl(null, Validators.required),
        ingredientControl: this.ingredientControl
      }
    )

    /* If edit mode is on, modify the addForm with new information of to-be-editted recipe */
    if (this.isEditted) {
      console.log('edit mode on')

      this.addForm.patchValue({
        recipeName: this.newRecipe.name,
        recipeDescription: this.newRecipe.description,
        recipeImage: this.newRecipe.image,
        recipeLevel: this.newRecipe.level,
        recipeTime: this.newRecipe.time,
        recipeProcess: this.newRecipe.process,
      })

      this.ingredients = this.newRecipe.ingredients
    }

  }


  cancel() {
    this.router.navigate(['recipes'])

  }

  onSave() {

    //Set the newRecipe to new edited or added values
    this.newRecipe = new Recipe(
      this.addForm.value.recipeName,
      this.addForm.value.recipeDescription,
      this.addForm.value.recipeImage,
      this.addForm.value.recipeLevel,
      this.addForm.value.recipeTime,
      this.ingredients,
      this.addForm.value.recipeProcess
    )

    //Confirm the changes before save

    let result = confirm("Do you want to save the changes?")


    /* Check the type of change. If its is add new, push new recipe to the end of array. if it
    is eddited, replace the old recipe with new recipe, so the position of the original won't be changed */

    if (result) {
      if (this.isEditted) {
        this.recipeService.recipes.splice(parseInt(this.id, 10), 1, this.newRecipe)
      } else {
        this.recipeService.recipes.push(this.newRecipe)
      }

      /* finally, set the currentIndex in the recipeservice to the index of new added/modified recipe.
      this index will be used in the RecipeComponent to navigate the page view to the latest added/modified/visited
      recipe. Then navigate back to the recipe page. Here, we will see the newest recipe shown*/

      this.dataStorageService.saveRecipes()
      this.recipeService.currentIndex = this.recipeService.recipes.indexOf(this.newRecipe)
      this.router.navigate(["recipes"])
    }
  }


  //When user press button 'Add new ingredient': open new add form
  onChange() {

    this.ingredientControl.push(new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      ingredientAmount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+\.?[0-9]*$/)]),
      ingredientUnit: new FormControl(null, Validators.required),
    }))
    document.getElementById('ingredient-form').style.display = 'block'
    this.canAddNew = true
  }

  onAddIngredient() {
    

  
    this.ingredients=[]
    this.ingredientControl.value.forEach(element => {
      let item= new Ingredient(element.ingredientName,element.ingredientAmount,element.ingredientUnit)
      this.ingredients.push(item)
     
    });
    /* Change the info of ingredient list of the original recipe */
    this.newRecipe.ingredients=this.ingredients
    
    /* Hide the add ingredient form again and enable add new ingredient button */
    this.canAddNew = false
    document.getElementById('ingredient-form').style.display = 'none'
    
  }

  onCancelIngredient() {

    document.getElementById('ingredient-form').style.display = 'none'
    this.ingredientControl.removeAt(-1)
    this.canAddNew = false
  }

  getIngredientCtr() {
    return (this.addForm.get('ingredientControl') as FormArray).controls
  }

  onDelete(i:number){

/* This onDelete only change the display,to actually delete, user must press update
This function wont be run here: this.newRecipe.ingredients.splice(i,1)  */
    this.ingredientControl.removeAt(i)
  }

}
