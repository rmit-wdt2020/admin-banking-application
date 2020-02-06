import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from '../../../models/transactions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public transactions: Transaction[] = [];
  selectedAccountId: number;
  selectedCustomerId: number;
  startDate: any;
  endDate: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCustomerId = params['customerid'];
      this.selectedAccountId = params['accountid'];
      this.startDate = params['startdate'];
      this.endDate = params['enddate'];
     });
     console.log(this.selectedCustomerId);
     console.log(this.selectedAccountId);
     console.log(this.startDate);
     console.log(this.endDate);
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
      accountNumber: 4200,
      amount: 100,
      comment: 'Sec trans',
      modifyDate: new Date('2019-02-16')
    };

    const transTwoo: Transaction = {
      transactionID: 1,
      transactionType: 'T',
      accountNumber: 4200,
      amount: 100,
      comment: 'Sec trans',
      modifyDate: new Date('2019-03-16')
    };

    this.transactions.push(transOne);
    this.transactions.push(transTwo);
    this.transactions.push(transTwoo);
    this.setPieChart();
    this.setBarChart();
  }
  setBarChart() {
    const ctx = document.getElementById('barChart');
    // const labels = this.transactions.map(item => item.accountNumber)
    // .filter((value, index, self) => self.indexOf(value) === index);
    // const labels = ['Withdraw', 'Deposit', 'Transfer', 'Bill Pay'];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    for (const label of labels) {
      const filteredList = this.transactions.filter(x => x.modifyDate.toDateString().includes(label));
      data.push(filteredList.length);
    }
    // const filteredList = this.transactions;
    // data.push((filteredList.filter(x => x.transactionType === 'W')).length);
    // data.push((filteredList.filter(x => x.transactionType === 'D')).length);
    // data.push((filteredList.filter(x => x.transactionType === 'T')).length);
    // data.push((filteredList.filter(x => x.transactionType === 'B')).length);
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Month'
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) { if (value % 1 === 0) { return value; } }
            },
            scaleLabel: {
              display: true,
              labelString: 'Number of transactions'
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            }
          }]
        }
      }
    });
  }
  setPieChart() {
    const ctx = document.getElementById('pieChart');
    const labels = ['Withdraw', 'Deposit', 'Transfer', 'Bill Pay'];
    const data = [];
    const filteredList = this.transactions;
    data.push((filteredList.filter(x => x.transactionType === 'W')).length);
    data.push((filteredList.filter(x => x.transactionType === 'D')).length);
    data.push((filteredList.filter(x => x.transactionType === 'T')).length);
    data.push((filteredList.filter(x => x.transactionType === 'B')).length);
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ]
        }]
      },
      options: {
        legend: {
          display: true
        },
        responsive: false
      }
    });
  }
}
