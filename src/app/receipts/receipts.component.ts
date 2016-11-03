import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['login'])
  }
}
