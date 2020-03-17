import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder,  } from "@angular/forms";
import { UserService } from '../../data/user.service';
import { NotifierService } from 'angular-notifier';
import { environment } from './../../../environments/environment';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private notifier: NotifierService;

  SERVER_HOST = environment.SERVER_HOST;

  editProfile = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    city: new FormControl(''),
    user_email: new FormControl('', [Validators.required, Validators.email])
  });

  data: any;

  test = "prueba";

  // tslint:disable-next-line: variable-name
  profile_pic = "https://image.flaticon.com/icons/png/512/50/50050.png";

  fileToUpload: File = null;

  constructor(private userservice: UserService, notifier: NotifierService, public fb: FormBuilder, private cloudinary: Cloudinary) {
    console.log(cloudinary.cloudinaryInstance.image('dog'));
    this.send();
    this.notifier = notifier;
    this.editProfile = this.fb.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      city: new FormControl(''),
      user_email: new FormControl('', [Validators.required, Validators.email]),
      profile_pic: [null]
    })
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editProfile.patchValue({
      avatar: file
    });
    this.editProfile.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.profile_pic = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit() {
  }

  send() {
    this.data = this.editProfile;
    console.log(this.data);



    // if (this.data.invalid) {
    //   return;
    // }

    // this.userservice.updateUser(this.data.value).subscribe((res: any) => {
    //   // console.log(res);

    //   if (res.userId) {
    //     this.showNotification('success', res.message);
    //     this.data.reset();
    //   } else {
    //     this.showNotification('error', res.message);
    //   }
    // });
  }


  onFileChange(files: FileList) {

    this.fileToUpload = files.item(0);
    this.test = this.fileToUpload.name;


  }

}
