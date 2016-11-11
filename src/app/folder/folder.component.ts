import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-receipts',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  private displayName;
  private receipts;
  private storage;
  private folderName;
  private uploading = false;
  private fileAdded = false;

  private description: string;
  private amount: string;

  constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.displayName = state.auth.displayName
      }
    });

    this.route.params.forEach(params => {
      this.af.database.object('/folders/' + params['folder']).subscribe(folder => this.folderName = folder.name);
      this.receipts = this.af.database.list('/folders/' + params['folder'] + '/receipts');
      this.storage = firebase.storage().ref('folders').child(params['folder']).child('receipts');
    });
  }

  add(description, amount, file: File) {
    this.uploading = true;
    const uuid = UUID.UUID();
    const date = new Date();

    this.storage.child(uuid).put(file).then(res => this.receipts.push({
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
}
