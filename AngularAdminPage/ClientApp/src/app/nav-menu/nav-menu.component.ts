import { Component, OnInit, Injectable, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input()
  loggedIn: any;
  isExpanded = false;
  constructor(private router: Router) {}

  ngOnInit() {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  // Loggin in admin if successfull and redirecting to customer list page.
  onSubmit(form: NgForm) {
    if (form.value.AdminID === 'admin' && form.value.Password === 'admin') {
      this.loggedIn = true;
      this.router.navigate(['\customer-list']);
    }
  }
}
