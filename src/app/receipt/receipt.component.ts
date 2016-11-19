import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  private folderId: string;
  private receipt: any;
  private editDescription: string;
  private editAmount: string;
  private receipt$: FirebaseObjectObservable<any>;
  private editMode: boolean = false;

  constructor(private route: ActivatedRoute, private af: AngularFire, private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.folderId = params['folder'];
      const receiptId = params['receipt'];
      this.receipt$ = this.af.database.object(`/folders/${this.folderId}/receipts/${receiptId}`);
      this.receipt$.subscribe(receipt => {
          this.receipt = receipt;
          this.editAmount = receipt.amount;
          this.editDescription = receipt.description;
        }
      );
    })
  }

  save() {
    this.receipt$.update({
      description: this.editDescription,
      amount: this.editAmount
    });
  }

  cancel() {
    this.editDescription = this.receipt.description;
    this.editAmount = this.receipt.amount;
  }

  confirmDelete() {
    if (confirm('Are you sure?')) {
      firebase.storage().refFromURL(this.receipt.url).delete();
      this.receipt$.remove();
      this.router.navigate(['/folders', this.folderId]);
    }
  }
}
