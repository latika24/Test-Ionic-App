import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
public status;
  public uri:any='';
  public url='';
  public filesPath='';
  public fileType   = '';
  public filesName ='';
  constructor( private file: File,private filePath:FilePath,private transfer: FileTransfer,public toastController: ToastController,private fileChooser: FileChooser,private http: HttpClient) {}

  upload(){

    //to choose file and get file type and file name
    this.fileChooser.open().then(uri =>
      {
        this.uri=uri;
        this.filePath.resolveNativePath(uri).then(filePath =>
          {alert('filepath reached')
            this.filesPath = filePath;
            this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo =>
              {
                let files = fileInfo as FileEntry;
                files.file(success =>
                  {
                    this.fileType   = success.type;
                    this.filesName  = success.name;
                  });

                  alert(this.filesPath+ '' + this.fileType + '' + this.filesName);
              },err =>
              {
                console.log(err);
                throw err;
              });
          },err =>
          {
            console.log(err);
            throw err;
          });
      },err =>
      {
        console.log(err);
        throw err;
      });
  }

  submit(){
    console.log(this.url);
    console.log(this.file);    
    // let data={
    //   "data":this.file
    // }
    // this.http.post(this.url, JSON.stringify(data)).subscribe(async (res)=>{
    //   console.log(res);
    //   const toast = await this.toastController.create({
    //     message: 'Successfully Uploaded',
    //     duration: 2000
    //   });
    //   toast.present();
    // },async (error)=> {
    //   console.log(error);
    //   const toast = await this.toastController.create({
    //     message: error.message,
    //     duration: 2000
    //   });
    //   toast.present();});

  //FileTransferObject  
  const fileTransfer: FileTransferObject = this.transfer.create();
  

  //upload options
  let options: FileUploadOptions = {
    fileKey: this.filesName,
    fileName: this.filesName,
    chunkedMode: false,
    mimeType: this.fileType,
    headers: {}
  }

  //uploading
    fileTransfer.upload(this.filesPath, 'http://192.168.29.237:8000/documents/upload/', options)
    .then( async (data) => {

      console.log(data+" Uploaded Successfully");
      this.status=data;
      const toast = await this.toastController.create({
        message: 'Successfully Uploaded',
        duration: 2000
      });
      toast.present();
      
      alert('Submitted'+ JSON.stringify(data));

  }, async (err) => {

      alert('Submit Error'+ JSON.stringify(err));
      const toast = await this.toastController.create({
        message: err.message,
        duration: 2000
      });
      toast.present();
    });
  


    
        
  }
 
}
