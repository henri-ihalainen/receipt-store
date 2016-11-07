import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';
import  * as firebase from 'firebase';
import { Location } from '@angular/common';

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

  constructor(private af: AngularFire, private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.displayName = state.auth.displayName
      }
    });

    this.receipts = this.af.database.list('/receipts');
  }

  add(name, amount, file) {
    this.uploading = true;
    this.ref.child(file.name).put(file).then(res => this.receipts.push({
      name: name,
      amount: amount,
      user: this.displayName,
      url: res.downloadURL
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
