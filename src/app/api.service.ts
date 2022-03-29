import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://amirulasri.tplinkdns.com/printorderserver';
  constructor(public http: HttpClient, private route: Router) {
  }

  getAllItemsData(){
    return this.http.get(`${this.url}/getitems`);
  }

  register(user: User) {
    return this.http.post(`${this.url}/register`, user);
  }

  login(credentials: User): Observable<string>{
    return this.http.post<{token: string}>(`${this.url}/login`, credentials).pipe(
      map(response => response.token)
    );
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + token
    });

    const datareceive = this.http.post(`${this.url}/create`, 'body', { headers });
    return datareceive;
  }

  getAllOrderData(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + token
    });
    const datareceive = this.http.post(`${this.url}/getallorders`, 'body', { headers });
    return datareceive;
  }
}
