import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  orders: any = [];
  orderemptystate: boolean;

  constructor(public _apiService: ApiService,
    public toastController: ToastController, private localNotifications: LocalNotifications) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    this.getAllOrderData();
    this.checkOrderExists();
  }
  ionViewDidLeave(): void {
    this.orders = [];
    this.checkOrderExists();
  }

  testnotification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
    });
  }

  getAllOrderData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllOrderData().subscribe((res: any) => {
      this.orders = res;
    }, () => {
      this.presentToast2();
    });
  }

  checkOrderExists() {
    let statebool = false;
    if (this.orders === null) {
      statebool = true;
    } else {
      statebool = false;
    }
    return statebool;
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
