import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { EditCustomerModalPage } from '../edit-customer-modal/edit-customer-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userdata: any = [];
  constructor(public _apiService: ApiService, public toastController: ToastController, private editCustModal: ModalController) {
    this.getUserData();
  }

  ionViewDidEnter(): void {
    this.getUserData();
  }
  ionViewDidLeave(): void {
    this.userdata = [];
  }

  getUserData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getCustomerData().subscribe((res: any) => {
      this.userdata = res;
    }, (error: any) => {
      this.presentToast2();
    });
  }

  async openeditcustmodal(){
    const modal = await this.editCustModal.create({
      component: EditCustomerModalPage
    });

    await modal.present();
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
