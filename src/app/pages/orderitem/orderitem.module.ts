import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderitemPageRoutingModule } from './orderitem-routing.module';

import { OrderitemPage } from './orderitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderitemPageRoutingModule
  ],
  declarations: [OrderitemPage]
})
export class OrderitemPageModule {}
