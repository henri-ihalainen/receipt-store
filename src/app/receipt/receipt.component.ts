import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  private folderId;
  private receipt;

  constructor(private route: ActivatedRoute, private af: AngularFire, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      this.folderId = params['folder'];
      const receiptId = params['receipt'];
      this.af.database.object(`/folders/${this.folderId}/receipts/${receiptId}`).subscribe(receipt => {
        this.receipt = receipt;
        this.ref.detectChanges();
        }
      );
    })
  }
}
