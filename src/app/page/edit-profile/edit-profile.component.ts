import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../../data/user.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  SERVER_HOST = environment.SERVER_HOST;

  emailDb: string;
  nameDb: string;
  lastnameDb: string;
  cityDb: string;
  profilePic: any;

  editProfile: FormGroup;



  form: FormGroup;


  data: any;
  // test: any;

  // tslint:disable-next-line: variable-name
  profile_pic = "https://image.flaticon.com/icons/png/512/50/50050.png";


  fileToUpload: File = null;
  msgUpload = "Seleccionar Avatar";

  constructor(private userservice: UserService, private notifier: NotifierService, public fb: FormBuilder, private router: Router) {
    this.notifier = notifier;

    this.editProfile = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      user_email: new FormControl('', [Validators.required, Validators.email]),
      profile_pic: new FormControl('', Validators.required)
    });

    this.form = this.fb.group({
      profile_pic: ['']
    })
  }


  ngOnInit() {
    this.userservice.getUsers().subscribe((user: any) => {
      // console.log(user);
      if (user) {

        this.editProfile.controls.name.setValue(user.response.name);
        this.editProfile.controls.lastname.setValue(user.response.lastname);
        this.editProfile.controls.city.setValue(user.response.city);
        this.editProfile.controls.user_email.setValue(user.response.user_email);

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

  onFileChange(files) {

    const file = (files.target as HTMLInputElement).files[0];

    this.fileToUpload = file;
    this.msgUpload = this.fileToUpload.name;
    this.form.patchValue({
      profile_pic: file
    });
    this.form.get('profile_pic').updateValueAndValidity()

  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  submitForm() {
    this.data = this.editProfile;

    if (this.data.invalid) {
      return;
    }


    const formData: any = new FormData();
    formData.append("name", this.data.value.name);
    formData.append("lastname", this.data.value.lastname);
    formData.append("profile_pic", this.form.get('profile_pic').value);
    formData.append("user_email", this.data.value.user_email);
    formData.append("city", this.data.value.city);

    this.userservice.updateUser(formData).subscribe((res: any) => {
      if (res.response.profile_pic) {
        this.showNotification('success', res.message);
        this.router.navigate(['/profile']);
      } else {
        this.showNotification('error', res.message);
      }
    });
  }

}
