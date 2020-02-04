import { Component, OnInit, Input } from '@angular/core';
import { Accounts } from '../../../models/accounts';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  public accounts: Accounts[] = [];
  selectedCustomerId: number;
  selectedEntry: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.fetchAccountData();
  }

  fetchAccountData() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
      });
    console.log(this.selectedCustomerId);
    const accountOne: Accounts = {
      accountNumber: 4100,
      accountType: 'Savings',
      balance: 352.20,
      modifyDate: new Date('2019-01-16'),
      locked: false
  };

  const accountTwo: Accounts = {
      accountNumber: 4200,
      accountType: 'Checkings',
      balance: 352.20,
      modifyDate: new Date('2019-01-19'),
      locked: false
};

    this.accounts.push(accountOne);
    this.accounts.push(accountTwo);
  }

  toggleLock(accountNumber: number) {
    console.log('Toggling lock of account with number ' + accountNumber);
  }

  onSelectionChange(entry) {
    this.selectedEntry = entry;
}

}
