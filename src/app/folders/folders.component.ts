import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  private folders;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.folders = this.af.database.list('/folders');
  }

  new(name) {
    this.folders.push({name: name})
  }
}
