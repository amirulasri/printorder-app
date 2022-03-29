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

  constructor(public _apiService: ApiService, private menu: MenuController, private authService: ApiService,
    public toastController: ToastController) {
    this.menu.enable(true, 'sidenav');
    this.getAllOrderData();
  }

  ngOnInit() {
    this.authService.checkLogin().subscribe((res: any) => {
      if(res.status === 'valid'){
        console.log('OK');
      }
    });
  }

  getAllOrderData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllOrderData().subscribe((res: any) => {
      this.orders = res;
    }, (error: any) => {
      this.presentToast2();
    });
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
