import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customers';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: Customer[] = [];
  selectedEntry: any;
  constructor() { }

  ngOnInit() {
    const customerOne: Customer = {
      id: 1,
      customerName: 'Vineet',
      TFN: '12345678',
      address: 'Lalor',
      city: 'Melbourne',
      state: 'VIC',
      postCode: '3075',
      phone: '12345678',
      locked: false
  };

  const customerTwo: Customer = {
    id: 2,
    customerName: 'Maria',
    TFN: '12345678',
    address: '',
    city: 'Melbourne',
    state: 'VIC',
    postCode: '3075',
    phone: '',
    locked: false
};

    this.customers.push(customerOne);
    this.customers.push(customerTwo);
  }
  onSelectionChange(entry) {
    this.selectedEntry = entry;
}

  deleteCustomerData() {
    console.log('Deleting customer with id: ' + this.selectedEntry);
  }
  toggleLock(id: number) {
    console.log('Toggling lock of customer with id ' + id);
  }

}
