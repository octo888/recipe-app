import {Ingridient} from "../shared/ingrid.model";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingridChanged = new Subject<Ingridient[]>();
  startedEdit = new Subject<number>();

  private ingridients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomato', 15)
  ];

  getIngridients() {
    return this.ingridients.slice();
  }

  getIngridient(index: number) {
    return this.ingridients[index];
  }

  addIng(ing: Ingridient) {
    this.ingridients.push(ing);
    this.ingridChanged.next(this.ingridients.slice());
  }

  addIngridients(ingrids: Ingridient[]) {
    /*for (let ing of ingrids) {
      this.addIng(ing);
    }*/
    this.ingridients.push(...ingrids);
    this.ingridChanged.next(this.ingridients.slice());
  }

  updateIng(index: number, newIng: Ingridient) {
    this.ingridients[index] = newIng;
    this.ingridChanged.next(this.ingridients.slice());
  }

  deleteIng(index: number) {
    this.ingridients.splice(index, 1);
    this.ingridChanged.next(this.ingridients.slice());
  }

}
