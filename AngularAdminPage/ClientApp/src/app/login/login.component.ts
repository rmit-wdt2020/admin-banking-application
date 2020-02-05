import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loggedIn = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.AdminID === 'admin' && form.value.Password === 'admin') {
      this.router.navigate(['\customer-list']);
      this.loggedIn = true;
    }
}
}
