import {Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ds: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.ds.storeRecepies().subscribe( (response: Response) => {
        console.log(response);
      }
      );
  }

  onFetchData() {
    this.ds.getRecipes();
  }

}
