import { Component } from '@angular/core';
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
  constructor() {}
}
