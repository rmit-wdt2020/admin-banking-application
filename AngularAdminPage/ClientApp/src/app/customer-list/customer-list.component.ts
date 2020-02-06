import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customers';
import * as $ from "jquery";
import { ApiService } from '../services/api.service';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: Customer[] = [];
  public error;
  selectedEntry: any;
  http: HttpClient;
  constructor(private api: ApiService) { }
  url = 'http://localhost:59858/api/admin';

  ngOnInit() {
    this.api.get("/customers")
      .subscribe(data => { this.customers = data }, error => { console.log(error) });
    //$.get(this.url, function (customerList) {
    //  for (let x in customerList) {
    //  this.customers.push(x)}
    //})
  }
  onSelectionChange(entry) {
    this.selectedEntry = entry;
  }

  deleteCustomerData(){
    console.log('Deleting customer with id: ' + this.selectedEntry);
  }

}
