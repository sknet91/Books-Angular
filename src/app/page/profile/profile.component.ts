import { Component, OnInit } from '@angular/core';
import { UserService } from './../../data/user.service';
import { BooksService } from '../../data/books.service';
import { FormControl, FormGroup } from "@angular/forms";
import { IBook } from '../../interface-data/interface.DataEstrucura';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email: string;
  name: string;
  lastname: string;
  profilePic: string;


  Books: IBook[] | any;


  constructor(private userservice: UserService, private booksservice: BooksService) { }

  ngOnInit() {

    this.booksservice.getBookUser().subscribe((res: { response: any; }) => {
      console.log(res.response);
      this.Books = res.response;
    });

    this.userservice.getUsers().subscribe((user: any) => {
      // console.log(user.response);
      if (user) {
        this.name = user.response.name;
        this.email = user.response.user_email;
        this.lastname = user.response.lastname;
        if (user.response.profile_pic) {
          this.profilePic = user.response.profile_pic;
        } else {
          this.profilePic = "https://image.flaticon.com/icons/png/512/50/50050.png";
        }
      }
    });
  }

}
