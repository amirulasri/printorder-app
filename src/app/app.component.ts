import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'My Profile', url: 'profile', icon: 'person-circle' },
    { title: 'Orders', url: 'home', icon: 'bookmark' }
  ];
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
