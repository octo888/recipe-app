import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService, private authServ: AuthService) {}

  storeRecepies() {
    const token = this.authServ.getToken();
    return this.http.put('https://ng-recipe-66933.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes());
  }

  getRecipes() {

    const token = this.authServ.getToken();

    this.http.get('https://ng-recipe-66933.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingrids']) {
              recipe['ingrids'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
