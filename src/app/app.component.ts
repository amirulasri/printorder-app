import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'My Profile', url: 'profile', icon: 'person-circle'},
    {title: 'Orders', url: 'home', icon: 'bookmark'}
  ];
  constructor(private router: Router, private menu: MenuController) {}
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
