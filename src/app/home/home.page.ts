import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public file:any='';
  public url='';
  constructor(public toastController: ToastController,private fileChooser: FileChooser,private http: HttpClient) {}

  upload(){
      console.log("browser")
      this.fileChooser.open()
    .then(uri => {console.log(uri);this.file=uri;})
    .catch(e => console.log(e));
  }

  submit(){
    console.log(this.url);
    console.log(this.file);    
    let data={
      "data":this.file
    }
    this.http.post(this.url, JSON.stringify(data)).subscribe(async (res)=>{
      console.log(res);
      const toast = await this.toastController.create({
        message: 'Successfully Uploaded',
        duration: 2000
      });
      toast.present();
    },async (error)=> {
      console.log(error);
      const toast = await this.toastController.create({
        message: error.message,
        duration: 2000
      });
      toast.present();});


    
        
  }
 
}
