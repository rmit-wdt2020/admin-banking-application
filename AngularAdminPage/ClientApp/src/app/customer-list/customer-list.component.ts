import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customers';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: Customer[] = [];
  constructor() { }

  ngOnInit() {
    const customerOne: Customer = {
      customerName: 'Vineet',
      TFN: '12345678',
      address: 'Lalor',
      city: 'Melbourne',
      state: 'VIC',
      postCode: '3075',
      phone: '12345678'
  };

  const customerTwo: Customer = {
    customerName: 'Maria',
    TFN: '12345678',
    address: '',
    city: 'Melbourne',
    state: 'VIC',
    postCode: '3075',
    phone: ''
};

    this.customers.push(customerOne);
    this.customers.push(customerTwo);
  }

}
