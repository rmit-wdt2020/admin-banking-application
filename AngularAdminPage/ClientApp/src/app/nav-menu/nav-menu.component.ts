import { Component, OnInit, Injectable, NgModule, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../src/app/login/login.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
@NgModule({
  providers: [ LoginComponent ]
})
export class NavMenuComponent implements OnInit {
  @Input()
  loggedIn: any;
  isExpanded = false;
  constructor(private router: Router, private loginService: LoginComponent) {
    this.loginService.onChange.subscribe(x => {
      // this.loggedIn =  sessionStorage.getItem('loggedIn');
      console.log('here');
  });
  }

  ngOnInit() {
    sessionStorage.setItem('loggedIn', 'false');
    this.loggedIn =  sessionStorage.getItem('loggedIn');
    this.loginService.onChange.subscribe(x => {
      // this.loggedIn =  sessionStorage.getItem('loggedIn');
      console.log('here');
  });
  }

  logout() {
    sessionStorage.setItem('loggedIn', 'false');
    this.router.navigate(['\login']);
    this.loggedIn =  sessionStorage.getItem('loggedIn');
  }

  login() {
    this.router.navigate(['\login']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
