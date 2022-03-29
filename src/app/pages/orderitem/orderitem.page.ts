import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.page.html',
  styleUrls: ['./orderitem.page.scss'],
})
export class OrderitemPage implements OnInit {
  items: any = [];

  constructor(public _apiService: ApiService, public toastController: ToastController) {
    this.getAllItemsData();
  }

  ngOnInit() {
  }

  getAllItemsData() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getAllItemsData().subscribe((res: any) => {
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
      this.getAllItemsData();
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
