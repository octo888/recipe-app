import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeServ: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //this.recipe = this.recipeServ.getRecipe(this.id);

        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  private initForm() {

    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngrids = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeServ.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDesc = recipe.desc;
      if (recipe['ingrids']) {
        for (let ing of recipe.ingrids) {
          recipeIngrids.push(
            new FormGroup(
              {
                'name': new FormControl(ing.name),
                'amount': new FormControl(ing.amount)
              }
            )
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(recipeImgPath),
      'desc': new FormControl(recipeDesc),
      'ingrids': recipeIngrids
    });
  }

}
