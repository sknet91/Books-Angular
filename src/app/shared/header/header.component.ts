import { Component, OnInit } from '@angular/core';
import { UserService } from './../../data/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private userservice: UserService, private router: Router) {
  }

  ngOnInit() { }

  logout() {
    this.userservice.logout();
    this.router.navigate(['signin']);
  }

}
