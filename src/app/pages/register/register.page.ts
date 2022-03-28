import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private menu: MenuController, private route: Router,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private authService: ApiService) {
    this.menu.enable(false, 'sidenav');
  }

  ngOnInit() {
  }

  login() {
    this.route.navigate(['login']);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneno: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  async onSubmit(){
    const loading = await this.loadingCtrl.create({message: 'Registering'});
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({message: 'Successfully registered', duration: 3000, color: 'primary'});
        loading.dismiss();
        await toast.present();
        this.form.reset();
        this.route.navigate(['login']);
      },
      async () => {
        const toast = await this.toastCtrl.create({message: 'Register Failed', duration: 3000, color: 'danger'});
        loading.dismiss();
        await toast.present();
      }
    );
  }
}
