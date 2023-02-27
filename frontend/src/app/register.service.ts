import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerURL = "/api/register";

  constructor(private http: HttpClient) { }

  register(username: string, password: string, tutor: boolean) {
    const body = {username, password, tutor};
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.registerURL, body, {headers});
  }
}
