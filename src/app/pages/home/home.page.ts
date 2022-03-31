import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  orders: any = [];
  orderemptystate: boolean;

  constructor(public _apiService: ApiService, private menu: MenuController,
    public toastController: ToastController) {
    this.getAllOrderData();
    this.menu.enable(true, 'sidenav');
  }

  ionViewWillEnter(){
    this.getAllOrderData();
    this.menu.enable(true, 'sidenav');
  }

  ngOnInit() {
  }

  getAllOrderData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllOrderData().subscribe((res: any) => {
      this.orders = res;
      if(res === null){
        this.orderemptystate = true;
      }
    }, (error) => {
      this.presentToast2();
    });
  }

  checkOrderExists(){
    return this.orderemptystate;
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
      this.getAllOrderData();
      event.target.complete();
    }, 2000);
  }

}
