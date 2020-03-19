import { Component, OnInit } from '@angular/core';
import { UserService } from './../../data/user.service';
import { BooksService } from '../../data/books.service';
import { FormControl, FormGroup } from "@angular/forms";
import { IBook } from '../../interface-data/interface.DataEstrucura';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email: string;
  name: string;
  lastname: string;
  city: string;
  profilePic: any;


  Books: IBook[] | any;



  constructor(private userservice: UserService, private booksservice: BooksService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.booksservice.getBookUser().subscribe((res: { response: any; }) => {
      this.Books = res.response;
    });

    this.userservice.getUsers().subscribe((user: any) => {
      if (user) {
        this.name = user.response.name;
        this.email = user.response.user_email;
        this.lastname = user.response.lastname;
        this.city = user.response.city;
        if (user.response.profile_pic) {
          this.userservice.getImage().subscribe((data: any) => {
            this.createImageFromBlob(data);
          })
        } else {
          this.profilePic = "https://image.flaticon.com/icons/png/512/50/50050.png";
        }
      }
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profilePic = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }


}
