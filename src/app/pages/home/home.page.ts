import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu: MenuController, private authService: ApiService) {
    this.menu.enable(true, 'sidenav');
  }

  ngOnInit() {
    this.authService.onCreate().subscribe(console.log);
  }

}
