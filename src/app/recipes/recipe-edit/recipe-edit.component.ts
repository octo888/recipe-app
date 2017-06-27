import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(private route: ActivatedRoute, private recipeServ: RecipeService, private router: Router) { }

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
    /*const newRecipe = new Recipe(
      this.recipeForm['name'],
      this.recipeForm['desc'],
      this.recipeForm['imgPath'],
      this.recipeForm['ingrids'],
    );*/
    if (this.editMode) {
      this.recipeServ.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeServ.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddIngrid() {
    (<FormArray>this.recipeForm.get('ingrids')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingrids')).removeAt(index);
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
                'name': new FormControl(ing.name, Validators.required),
                'amount': new FormControl(ing.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }
            )
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgPath': new FormControl(recipeImgPath, Validators.required),
      'desc': new FormControl(recipeDesc, Validators.required),
      'ingrids': recipeIngrids
    });
  }

}
