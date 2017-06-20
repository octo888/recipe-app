import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingridient} from "../../shared/ingrid.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingridient;

  constructor(private slServ: ShoppingListService) { }

  ngOnInit() {
    this.sub = this.slServ.startedEdit.subscribe(
      (id: number) => {
        this.editedItemIndex = id;
        this.editMode = true;
        this.editedItem = this.slServ.getIngridient(id);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount);

    if (this.editMode) {
      this.slServ.updateIng(this.editedItemIndex, newIngridient);
    } else {
      this.slServ.addIng(newIngridient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slServ.deleteIng(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
