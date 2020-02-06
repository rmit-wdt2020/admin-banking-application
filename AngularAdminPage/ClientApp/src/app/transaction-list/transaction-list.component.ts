import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Transaction } from '../../../models/transactions';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  selectedAccountId: number;
  startDate = new FormControl();
  endDate = new FormControl();
  myFilter = (d: Date): boolean => {
    return d > this.startDate.value;
  }
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedAccountId = params['id'];
      });
      console.log(this.selectedAccountId);
      this.fetchTransactionData();
  }

  fetchTransactionData() {
    const transOne: Transaction = {
      transactionID: 1,
      transactionType: 'W',
      accountNumber: 4100,
      amount: 100,
      comment: 'First trans',
      modifyDate: new Date('2019-01-16')
  };

  const transTwo: Transaction = {
    transactionID: 1,
    transactionType: 'D',
    accountNumber: 4100,
    amount: 100,
    comment: 'Sec trans',
    modifyDate: new Date('2019-01-16')
};

    this.transactions.push(transOne);
    this.transactions.push(transTwo);

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
