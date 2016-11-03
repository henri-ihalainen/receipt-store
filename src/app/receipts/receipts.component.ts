import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  private displayName;
  private receipts;

  constructor(private af: AngularFire, private router: Router) {
  }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.displayName = state.auth.displayName
      }
    });

    this.receipts = this.af.database.list('/receipts');
  }

  add(name, amount) {
    this.receipts.push({name: name, amount: amount, user: this.displayName});
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['login']);
  }
}
