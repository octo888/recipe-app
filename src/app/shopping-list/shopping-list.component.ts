import { Component, OnInit } from '@angular/core';
import {Ingridient} from '../shared/ingrid.model';
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingridients: Ingridient[];

  constructor(private slServ: ShoppingListService) { }

  ngOnInit() {
    this.ingridients = this.slServ.getIngridients();
    this.slServ.ingridChanged.subscribe(
      (ing: Ingridient[]) => {
        this.ingridients = ing;
      }
    );
  }

}
