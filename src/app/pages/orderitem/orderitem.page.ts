import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.page.html',
  styleUrls: ['./orderitem.page.scss'],
})
export class OrderitemPage implements OnInit {
  items: any = [];
  orderid: any;
  totalprice: any = 0.00;
  userdata: any = [];
  totalpercentcomplete: any = 0;
  totalpercentcompletebar: any = 0;

  constructor(public _apiService: ApiService, public toastController: ToastController, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      this.orderid = param.orderid;
      this.getAllItemsData(this.orderid);
      this.getUserData();
    });
  }

  ngOnInit() {
  }

  getAllItemsData(orderids: any) {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllItemsData(orderids).subscribe((res: any) => {
      this.items = res;
      if(this.items !== null){
        let totalprices = 0.00;
        let percentscomplete = 0;
        let countitem = 0;
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        this.items.forEach(function(item) {
          totalprices = totalprices + parseFloat(item.price);
          percentscomplete = percentscomplete + parseFloat(item.progressbar);
          countitem ++;
        });
        this.totalprice = (Math.round(totalprices * 100) / 100).toFixed(2);
        this.totalpercentcompletebar = (Math.round((percentscomplete/countitem) * 100) / 100).toFixed(2);
        this.totalpercentcomplete = this.totalpercentcompletebar*100;
      }
    }, (error: any) => {
      this.presentToast2();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'primary',
      message: 'Success connect to server!',
      duration: 5000
    });
    toast.present();
  }

  async presentToast2() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'FAILED. Refresh again to get data',
      duration: 5000
    });
    toast.present();
  }

  getUserData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getCustomerData().subscribe((res: any) => {
      this.userdata = res;
    }, (error: any) => {
      this.presentToast2();
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getAllItemsData(this.orderid);
      event.target.complete();
    }, 2000);
  }

  viewimagebutton(status: string) {
    if (status === 'complete') {
      return true;
    } else {
      return false;
    }
  }

  checknotEmpty() {
    if (this.items === null) {
      return true;
    }
  }
}
