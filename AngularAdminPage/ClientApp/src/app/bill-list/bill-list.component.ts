import { Component, OnInit } from '@angular/core';
import { Billpay } from '../../../models/billpay';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../src/app/services/api.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  public bills: Billpay[] = [];
  selectedAccountId: number;
  selectedCustomerId: number;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['customerid'];
      this.selectedAccountId = params['accountid'];
     });
      this.fetchBillData();
  }
  fetchBillData() {
    const source = this.api.get('/billpay/' + this.selectedAccountId);
    source.subscribe(data => { this.bills = data; }, error => { console.log(error); });
    source.toPromise().then(x => this.changeDataForView());
  }
  changeDataForView() {
    for (let i = 0; i < this.bills.length; i++) {
      const dateToBeSplit = this.bills[i].modifyDate.toLocaleString();
      const splittedDate = dateToBeSplit.split('T');
      this.bills[i].modifyDate = splittedDate[0];
      const scheduledDate = this.bills[i].scheduleDate.toLocaleString();
      const scheduledDateModified = scheduledDate.replace('T', ' ');
      this.bills[i].scheduleDate = scheduledDateModified;
    }
  }
  toggleBlock(id: string) {
    this.api.post('/billlock', id).subscribe(error => {console.log(error); });
  }

}
