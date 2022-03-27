import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.page.html',
  styleUrls: ['./orderitem.page.scss'],
})
export class OrderitemPage implements OnInit {
  itemid: any;
  itemname: any;
  blackquantity: any;
  colorquantity: any;
  papertype: any;
  status: any;
  price: any;
  custid: any;
  items: any = [];

  constructor(public _apiService: ApiService) {
    this.getAllItemsData();
  }

  ngOnInit() {
  }

  getAllItemsData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllItemsData().subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      this.items = res;
    }, (error: any) => {
      console.log('ERROR ===', error);
    });
  }
}
