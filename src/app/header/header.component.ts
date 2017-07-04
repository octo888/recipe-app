import {Component, OnInit } from '@angular/core';
import {Response} from '@angular/http';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ds: DataStorageService, private authServ: AuthService) { }

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

  onLogout() {
    this.authServ.logout();
  }

}
