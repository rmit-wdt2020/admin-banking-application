import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customers';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedCustomerId: number;
  customerToBeEdited: Customer;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchCustomerData();
  }
  fetchCustomerData() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
      });
    console.log(this.selectedCustomerId);
    this.customerToBeEdited = {
      id: 1,
      customerName: 'Vineet',
      // TFN: '12345678',
      address: 'Lalor',
      city: 'Melbourne',
      state: 'VIC',
      postCode: '3075',
      phone: '12345678'
  };
  }
  editProfile(form: NgForm) {
      this.customerToBeEdited.customerName = form.value.customerName;
      this.customerToBeEdited.TFN = form.value.TFN;
      this.router.navigate(['\customer-list']);
  }
}
