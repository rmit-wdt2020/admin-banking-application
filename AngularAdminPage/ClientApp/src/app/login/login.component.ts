import { Component, OnInit, NgModule, EventEmitter, Injectable, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { NavMenuComponent } from '../../../src/app/nav-menu/nav-menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChange = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.AdminID === 'admin' && form.value.Password === 'admin') {
      sessionStorage.setItem('loggedIn', 'true');
      this.onChange.emit('true');
      this.router.navigate(['\customer-list']);
    }
    }
  }
