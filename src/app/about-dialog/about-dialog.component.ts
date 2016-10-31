import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'ngio-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent {
  picture: string;
  name: string;
  twitter: string;
  bio: string;
  website: string;
  
  constructor(public dialogRef: MdDialogRef<AboutDialogComponent>) {}
}
