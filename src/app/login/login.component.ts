import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, NavigationCancel, Event, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private redirectUrl = '/';

  constructor(private af: AngularFire, private router: Router, route: ActivatedRoute) {
  }

  login() {
    this.af.auth.login().then(() => {
        this.router.navigate([this.redirectUrl])
      }
    );
  }

  ngOnInit() {
  }

}
