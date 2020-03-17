import { Component, Output } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { UserService } from './data/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'books';
  SERVER_HOST = environment.SERVER_HOST;

  // @Output() login: string;

  constructor(private userservice: UserService, private router: Router) {
    // this.login = this.readLocalStorageValue('ACCESS_TOKEN');
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  }

  logout() {
    this.userservice.logout();
    this.router.navigate(['signin']);
  }
}
