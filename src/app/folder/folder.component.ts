import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
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
  private receiptImages;
  private folderName;
  private uploading = false;
  private fileAdded = false;
  private description: string;
  private amount: string;
  private folderId: string;
  private folder$: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      if (state) {
        this.displayName = state.auth.displayName
      }
    });

    this.route.params.forEach(params => {
      this.folderId = params['folder'];
      this.folder$ = this.af.database.object('/folders/' + this.folderId);
      this.folder$.subscribe(folder => this.folderName = folder.name);
      this.receipts = this.af.database.list('/folders/' + this.folderId + '/receipts');
      this.receiptImages = firebase.storage().ref('folders').child(this.folderId).child('receipts');
    });
  }

  add(description, amount, file: File) {
    this.uploading = true;
    const uuid = UUID.UUID();
    const date = new Date();

    this.receiptImages.child(uuid).put(file).then(res => this.receipts.push({
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

  confirmDelete() {
    if (confirm('Are you sure?')) {
      this.receipts.subscribe(url => {
        console.log(url);
        firebase.storage().refFromURL(url).delete();
        this.folder$.remove();
        this.router.navigate(['/folders']);
      });
    }
  }
}
