import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) {
  }

  getAllItemsData(){
    return this.http.get('https://amirulasri.tplinkdns.com/printorderserver/getitems.php');
  }
}
