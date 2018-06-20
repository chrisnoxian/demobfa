import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  template : "<p>...press back button to exit</p>"
})
export class HomePage {
  constructor(public navCtrl: NavController, private iab: InAppBrowser, public platform: Platform,private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, private diagnostic: Diagnostic) {
    platform.ready().then(() => {
      const browser = this.iab.create('http://study.bfa.org/','_blank',{zoom:'yes',location:'no', clearcache:'yes', clearsessioncache: 'yes'});
      browser.show();
      browser.on('loadstart').subscribe(
        (data) => {  
          console.log("URL IS", data.url);
          this.downloadfile(data.url)
        },
        err => {
          console.log("InAppBrowser Loadstop Event Error: " + err);
        }
        );
    });
  }
  downloadfile(url) {
    var externalCheck = (!url.includes("study.bfa.org"));
    var pdfCheck = (url.substr(url.length - 4) == '.pdf');
    if (externalCheck || pdfCheck) {
      window.open(url, "_system", 'location=no');
    }
  }
}