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

  constructor(private menu: MenuController, private route: Router,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private authService: ApiService) {
    this.menu.enable(false, 'sidenav');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit() {
  }

  register(){
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
        const toast = await this.toastCtrl.create({message: 'Login Failed', duration: 3000, color: 'danger'});
        await toast.present();
        loading.dismiss();
      }
    );
  }
}
