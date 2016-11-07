import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  private displayName;
  private receipts;
  private ref = firebase.storage().ref();
  private uploading = false;
  private fileAdded = false;

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

  add(description, amount, file: File) {
    this.uploading = true;
    const uuid = UUID.UUID();
    const date = new Date();

    this.ref.child(uuid).put(file).then(res => this.receipts.push({
      description: description,
      amount: amount,
      user: this.displayName,
      uuid: uuid,
      url: res.downloadURL,
      date: date.toISOString()
    }).then(() => {
      this.uploading = false;
      this.fileAdded = false;
    }));
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['login']);
  }

  goToUrl(url) {
    window.location.href = url;
  }
}
