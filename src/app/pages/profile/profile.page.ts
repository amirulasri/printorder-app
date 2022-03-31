import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userdata: any = [];
  constructor(public _apiService: ApiService, public toastController: ToastController) {
    this.getUserData();
  }

  getUserData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getCustomerData().subscribe((res: any) => {
      this.userdata = res;
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

}
