import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.page.html',
  styleUrls: ['./edit-customer-modal.page.scss'],
})
export class EditCustomerModalPage {

  constructor(private editCustModal: ModalController) { }

  dismissEditCustModal(){
    this.editCustModal.dismiss();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editCustForm = new FormGroup({
    custName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phoneNo: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

}
