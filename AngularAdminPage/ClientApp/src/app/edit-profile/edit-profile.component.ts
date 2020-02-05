import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customers';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedCustomerId: number;
  customerToBeEdited: Customer;
  editProfileForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private _fb: FormBuilder) {
    this.fetchCustomerData();
    this.editProfileForm = this._fb.group({
      customername: [this.customerToBeEdited.customerName, [Validators.required, Validators.maxLength(50)]],
      phone: [this.customerToBeEdited.phone, [Validators.required, Validators.pattern('^[(]61[)][\\s][-][\\s][1-9]\\d{7}$')]],
      tfn: [this.customerToBeEdited.TFN, [Validators.pattern('[0-9]\\d{10}')]],
      address: [this.customerToBeEdited.address, [Validators.maxLength(50)]],
      city: [this.customerToBeEdited.city, [Validators.pattern('^[A-Z][a-z]+$'), Validators.maxLength(40)]],
      state: [this.customerToBeEdited.state, [Validators.pattern('[A-Z]{3}')]],
      postcode: [this.customerToBeEdited.postCode, [Validators.pattern('[1-9]\\d{3}')]]
    });
   }

  ngOnInit() {}
  fetchCustomerData() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
      });
    console.log(this.selectedCustomerId);
    this.customerToBeEdited = {
      id: 1,
      customerName: 'Vineet',
      TFN: '12345678',
      address: 'Lalor',
      city: 'Melbourne',
      state: 'VIC',
      postCode: '3075',
      phone: '12345678'
  };
  }
  editProfile() {
      if (!this.editProfileForm.valid) {
        console.log(this.customerToBeEdited);
        return;
      }
      this.customerToBeEdited = this.editProfileForm.value;
      console.log(this.customerToBeEdited);
      // this.router.navigate(['\customer-list']);
  }
}
