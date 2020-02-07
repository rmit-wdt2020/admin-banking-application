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
  }

  fetchAccountData() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['id'];
      });
    const source = this.api.get('/accounts/' + this.selectedCustomerId);
    source.subscribe(data => { this.accounts = data; }, error => { console.log(error); });
    source.toPromise().then(x => this.changeDataForView());
    }
    changeDataForView() {
      for (let i = 0; i < this.accounts.length; i++) {
        const dateToBeSplit = this.accounts[0].modifyDate.toLocaleString();
        const splittedDate = dateToBeSplit.split('T');
        this.accounts[i].modifyDate = splittedDate[0];
    }
  }
  onSelectionChange(entry) {
    this.selectedEntry = entry;
}

}
