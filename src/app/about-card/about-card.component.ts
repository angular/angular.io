import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

const _aboutCardInputs = ['picture', 'name', 'twitter', 'bio', 'website'];

@Component({
  selector: 'about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.css']
})
export class AboutCardComponent {
  dialogRef: MdDialogRef<AboutDialogComponent>;
  
  /*@Input()*/ picture: string;
  /*@Input()*/ name: string;
  /*@Input()*/ twitter: string;
  /*@Input()*/ bio: string;
  /*@Input()*/ website: string;

  constructor(public elementRef: ElementRef, public dialog: MdDialog, public viewContainerRef: ViewContainerRef) {
    
    // Manually get @Input's:
    _aboutCardInputs.forEach(inputName => {
      if (!this[inputName]) this[inputName] = elementRef.nativeElement.getAttribute(inputName);
    });
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
