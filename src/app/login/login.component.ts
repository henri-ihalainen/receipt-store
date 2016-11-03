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
    router.events
      .filter((event: Event) => event instanceof NavigationCancel)
      .subscribe(cancelEvent => this.redirectUrl = cancelEvent.url);
  }

  login() {
    this.af.auth.login().then(() => {
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl])
        }
      }
    );
  }

  ngOnInit() {
  }

}
