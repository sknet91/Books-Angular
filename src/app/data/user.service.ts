import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserUpdate } from '../interface-data/interface.DataEstrucura';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_HOST = environment.SERVER_HOST;

  private loggedInStatus = false;

  constructor(private http: HttpClient) { }
  user: IUser[] | any;

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }

  createUser(user: IUser) {
    try {
      const response = this.http.post(`${this.SERVER_HOST}/user`, user);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  loginUser(login: IUser) {
    try {
      const response = this.http.post(`${this.SERVER_HOST}/user/login`, login);
      this.setLoggedIn(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  updateUser(user: IUserUpdate) {
    try {
      const idUser = localStorage.getItem('USER_ID');
      const response = this.http.put(`${this.SERVER_HOST}/user/${idUser}`, user);
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  logout(){
    localStorage.removeItem('access_token');
    this.setLoggedIn(false);
  }

  getUsers(): Observable <any> {
    try {
      const idUser = localStorage.getItem('USER_ID');
      const response: any = this.http.get(`${this.SERVER_HOST}/user/${idUser}` );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
