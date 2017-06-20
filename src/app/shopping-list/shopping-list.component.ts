import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingridient} from '../shared/ingrid.model';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[];
  private sub: Subscription;

  constructor(private slServ: ShoppingListService) { }

  ngOnInit() {
    this.ingridients = this.slServ.getIngridients();
    this.sub = this.slServ.ingridChanged.subscribe(
      (ing: Ingridient[]) => {
        this.ingridients = ing;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onEditItem(id: number) {
    this.slServ.startedEdit.next(id);
  }

}
