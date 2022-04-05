import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.page.html',
  styleUrls: ['./orderview.page.scss'],
})
export class OrderviewPage implements OnInit {
  items: any = [];
  orderid: any;
  totalprice: any = 0.00;
  userdata: any = [];
  totalpercentcomplete: any = 0;
  totalpercentcompletebar: any = 0;
  managerdata: any = [];

  constructor(public _apiService: ApiService, public toastController: ToastController,
    private menu: MenuController, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      this.orderid = param.orderid;
      this.getAllItemsData(this.orderid);
      this.getManagerData(this.orderid);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  getManagerData(orderids: any) {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getManagerDataPass(orderids).subscribe((res: any) => {
      this.managerdata = res[0];
    }, (error: any) => {
      this.presentToast2();
    });
  }

  getAllItemsData(orderids: any) {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllItemsDataPass(orderids).subscribe((res: any) => {
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
