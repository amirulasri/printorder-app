import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://amirulasri.tplinkdns.com/printorderserver';
  constructor(public http: HttpClient) {
  }

  changeCustomerInformation(newCustData: any){
    return;
  }

  getAllItemsData(orderid: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + token
    });
    const datareceive = this.http.post(`${this.url}/getitems?d=${orderid}`, 'body', { headers });
    return datareceive;
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

  getCustomerData(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + token
    });
    const datareceive = this.http.post(`${this.url}/getuserdata`, 'body', { headers });
    return datareceive;
  }

  //GET DATA WITHOUT LOGIN
  getAllItemsDataPass(orderid: any){
    const datareceive = this.http.post(`${this.url}/orderview/getitems?d=${orderid}`, 'body');
    return datareceive;
  }

  getManagerDataPass(orderid: any){
    const datareceive = this.http.post(`${this.url}/orderview/getmanagerdata?d=${orderid}`, 'body');
    return datareceive;
  }
}
