import { Component, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../data/user.service";
import { Router } from '@angular/router';


@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signin = new FormGroup({
    user_email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  data: any;
  private token: string;

  constructor(private userservice: UserService, private router: Router) {
    // this.send();
  }

  ngOnInit() { }

  send() {
    console.log("1");
    this.data = this.signin;
    // console.log(this.data);

    if (this.data.invalid) {
      return;
    }

    this.userservice.loginUser(this.data.value).subscribe((res: any) => {
      if (res.userExist) {
        console.log(res);
        // localStorage.setItem('userUploaderId', res.userExist._id);
        this.userservice.setLoggedIn(true);
        this.saveToken(res.token, '1', res.userExist._id);
        this.router.navigate(['/profile']);
      } else {
        window.alert(res.message);
      }
    });
  }

  private saveToken(token: string, expiresIn: string, idUser: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("USER_ID", idUser);

    this.token = token;
  }

  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem("ACCESS_TOKEN");
  //   }
  //   return this.token;
  // }

  public get loggedIn(): boolean {
    return (localStorage.getItem('ACCESS_TOKEN') !== null);
  }



  // Cerrar session {
  // localStorage.removeItem('tutorial');
  // }
}
