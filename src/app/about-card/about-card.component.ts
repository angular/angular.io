import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent {
  dialogRef: MdDialogRef<AboutDialogComponent>;
  picture: string;
  name: string;
  twitter: string;
  bio: string;
  website: string;

  constructor(public elementRef: ElementRef, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    this.picture = elementRef.nativeElement.getAttribute('picture');
    this.name = elementRef.nativeElement.getAttribute('name');
    this.twitter = elementRef.nativeElement.getAttribute('twitter');
    this.bio = elementRef.nativeElement.getAttribute('bio');
    this.website = elementRef.nativeElement.getAttribute('website');
  }
  
  openDialog(picture, name, twitter, bio, website) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
      
    this.dialogRef = this.dialog.open(AboutDialogComponent, config);
    this.dialogRef.componentInstance.picture = picture;
    this.dialogRef.componentInstance.name = name;
    this.dialogRef.componentInstance.twitter = twitter;
    this.dialogRef.componentInstance.bio = bio;
    this.dialogRef.componentInstance.website = website;
    
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null; // garbage collect
    });
  }
}
