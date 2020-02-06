import { Component, OnInit, Input } from '@angular/core';
import { Accounts } from '../../../models/accounts';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from '../../../src/app/services/api.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  public accounts: Accounts[] = [];
  selectedCustomerId: number;
  selectedEntry: any;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
      this.fetchAccountData();
      this.changeDataForView();
  }

  fetchAccountData() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
      });
    this.api.get('/accounts/' + this.selectedCustomerId)
      .subscribe(data => { this.accounts = data; }, error => { console.log(error); });
    }
    changeDataForView() {
      console.log(this.accounts.length);
      for (let i = 0; i < this.accounts.length; i++) {
        const dateToBeSplit = this.accounts[0].modifyDate;
        const splittedDate = dateToBeSplit.split('T');
        console.log(splittedDate);
        this.accounts[i].modifyDate = splittedDate[0];
    }
  } 
  onSelectionChange(entry) {
    this.selectedEntry = entry;
}

}
