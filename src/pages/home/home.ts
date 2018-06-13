import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

 declare var cordova: any;
@Component({
 template : "<p>...press back button to exit</p>"
})
export class HomePage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser, public platform: Platform, private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, private diagnostic: Diagnostic) {
platform.ready().then(() => {
     
      let browser = this.iab.create('http://study.bfa.org/','_blank',{zoom:'yes',location:'no'});
   
      browser.show();
      browser.on('loadstart').subscribe(
      (data) => {
       console.log("URL IS",data.url);
       this.downloadfile(data.url)
      },
      err => {
        console.log("InAppBrowser Loadstop Event Error: " + err);
});
    });
    }
downloadfile(url)
  {
    console.log("INSIDE DOWNLOAD FILE", url);

    var extension = url.substr(url.length - 4);
      if (extension == '.pdf') {
        console.log("FILE IS PDF");

        this.diagnostic.requestExternalStorageAuthorization().then(e =>{
          const fileTransfer: FileTransferObject = this.transfer.create();  
              fileTransfer.download(url,  cordova.file.externalDataDirectory + "receipt.pdf").then((entry) => {
                console.log('download complete: ' + entry.toURL());

                this.fileOpener.open(entry.toURL(), 'application/pdf')
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));

              }, (error) => {
                console.log("ERRO WHILE DOWNLOADING", error)
              });
        }).catch(e =>{
          console.log("EXTERNAL STORAGE HAS NO PERMISSIon")
        })
      }
  }
 
} 

                                                                                  
