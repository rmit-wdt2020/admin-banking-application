import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Transaction } from '../../../models/transactions';
import {FormControl} from '@angular/forms';
import { ApiService } from '../../../src/app/services/api.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  selectedAccountId: number;
  selectedCustomerId: number;
  startDate = new FormControl();
  endDate = new FormControl();
  myFilter = (d: Date): boolean => {
    return d > this.startDate.value;
  }
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['customerid'];
      this.selectedAccountId = params['accountid'];
     });
      console.log(this.selectedAccountId);
      console.log(this.selectedCustomerId);
      this.fetchTransactionData();
  }

  fetchTransactionData() {
    this.api.get('/transactions/' + this.selectedAccountId)
      .subscribe(data => { this.transactions = data; }, error => { console.log(error); });
    console.log(this.startDate);
  }
  filterTransactions() {
    console.log('Fetching transactions between ' + this.startDate.value.toDateString() + ' and ' + this.endDate.value.toDateString());
  }
  resetFilter( ) {
    this.startDate = new FormControl();
    this.endDate = new FormControl();
  }

}
