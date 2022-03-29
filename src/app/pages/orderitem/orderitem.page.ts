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

  constructor(public _apiService: ApiService, public toastController: ToastController, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      this.orderid = param.orderid;
      console.log(this.orderid);
      this.getAllItemsData(this.orderid);
    });
  }

  ngOnInit() {
  }

  getAllItemsData(orderids) {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllItemsData(orderids).subscribe((res: any) => {
      this.items = res;
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

  doRefresh(event) {
    setTimeout(() => {
      this.getAllItemsData(this.orderid);
      event.target.complete();
    }, 2000);
  }

  viewimagebutton(status: string){
    if(status === 'complete'){
      return true;
    }else{
      return false;
    }
  }
}
