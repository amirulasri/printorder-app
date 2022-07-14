import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public _apiService: ApiService, private menu: MenuController, private route: Router,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private authService: ApiService) {
  }

  ionViewDidEnter(): void {
    this.menu.enable(false);
  }
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      /* eslint no-underscore-dangle: 0 */
      this._apiService.getCustomerData().subscribe((res: any) => {
        if (res.status === 'valid') {
          this.route.navigate(['home']);
        } else {
          this.presentToastinvalid();
        }
      }, (error) => {
        this.presentToast2(error);
      });
    }
  }

  async presentToast2(error: any) {
    const toast = await this.toastCtrl.create({
      color: 'danger',
      message: 'Error',
      duration: 5000
    });
    toast.present();
  }

  async presentToastinvalid() {
    const toast = await this.toastCtrl.create({
      color: 'danger',
      message: 'Invalid Session',
      duration: 5000
    });
    toast.present();
  }

  register() {
    this.route.navigate(['register']);
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Logging in' });
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async token => {
        localStorage.setItem('token', token);
        this.form.reset();
        this.route.navigate(['home']);
        loading.dismiss();
      },
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Login Failed', duration: 3000, color: 'danger' });
        await toast.present();
        loading.dismiss();
      }
    );
  }
}
