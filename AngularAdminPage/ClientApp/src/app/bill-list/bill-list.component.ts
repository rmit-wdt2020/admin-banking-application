import { Component, OnInit } from '@angular/core';
import { Billpay } from '../../../models/billpay';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  public bills: Billpay[] = [];
  selectedAccountId: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedAccountId = params['id'];
      });
    console.log(this.selectedAccountId);
    this.fetchBillData();
  }
  fetchBillData() {
    const billOne: Billpay = {
      id: 1,
      accountNumber: 4100,
      payeeId: 1,
      amount: 100,
      scheduleDate: new Date('2019-01-16'),
      period: 'Monthly',
      modifyDate: new Date('2019-01-16'),
      blocked: false
  };

  const billTwo: Billpay = {
    id: 2,
    accountNumber: 4200,
    payeeId: 2,
    amount: 200,
    scheduleDate: new Date('2019-01-16'),
    period: 'Monthly',
    modifyDate: new Date('2019-01-16'),
    blocked: false
};


    this.bills.push(billOne);
    this.bills.push(billTwo);
  }
  toggleBlock(id: number) {
    console.log('Toggling block of bill with id ' + id);
  }

}
