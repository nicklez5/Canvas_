import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:8080/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public token: string; 
  getUserBoard(): Observable<any>{
    return this.http.get(API_URL + 'canvas', { responseType: 'text'});
  }

}
