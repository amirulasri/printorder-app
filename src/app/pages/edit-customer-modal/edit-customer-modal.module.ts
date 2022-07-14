import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomerModalPageRoutingModule } from './edit-customer-modal-routing.module';

import { EditCustomerModalPage } from './edit-customer-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomerModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditCustomerModalPage, EditCustomerModalPageRoutingModule]
})
export class EditCustomerModalPageModule {}
