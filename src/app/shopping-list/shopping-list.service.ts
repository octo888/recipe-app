import {Ingridient} from "../shared/ingrid.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {
  ingridChanged = new EventEmitter<Ingridient[]>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomato', 15)
  ];

  getIngridients() {
    return this.ingridients.slice();
  }

  addIng(ing: Ingridient) {
    this.ingridients.push(ing);
    this.ingridChanged.emit(this.ingridients.slice());
  }

  addIngridients(ingrids: Ingridient[]) {
    /*for (let ing of ingrids) {
      this.addIng(ing);
    }*/
    this.ingridients.push(...ingrids);
    this.ingridChanged.emit(this.ingridients.slice());
  }

}
