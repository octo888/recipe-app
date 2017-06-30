import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingridient} from "../shared/ingrid.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('test', 'test', 'http://placehold.it/50x50', [new Ingridient("tomato", 1)]),
    new Recipe('test2', 'test2', 'http://placehold.it/50x50', [new Ingridient("apple", 3), new Ingridient("coal", 12)])
  ];

  constructor(private slServ: ShoppingListService) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  getRecipes() {
    //return this.recipes.slice();
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngToShopList(ingrids: Ingridient[]) {
    this.slServ.addIngridients(ingrids);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
