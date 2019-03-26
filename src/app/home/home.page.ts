import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pairedList: pairedlist;
  pairedDeviceID: number = 0;
  listToggle: boolean = false;
  dataSend: string = "";
  dataReceived: string = "";
  

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController, private toastCtrl: ToastController) { 
    this.checkBluetoothEnabled();
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.showPaired();
    }, error => {
      this.showError("Please Enable Bluetooth")
    });
  }

  radioChange(num:number){
    console.log(num);
    this.pairedDeviceID = num;
  }


  showPaired() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.showError("Please Enable Bluetooth")
      this.listToggle = false;
    });
  }


  selectDevice() {
    let Device = this.pairedList[this.pairedDeviceID];
    if (!Device.address) {
      this.showError('Select Device to connect');
      return;
    }
    let address = Device.address;
    console.log(address);
    let name = Device.name;
    console.log(name);
    this.connect(address);
  }


  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
      this.showToast("Successfully Connected");
    }, error => {
      this.showError("Error:Connecting to Device");
    });
  }


  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      this.handleData(success);
      this.showToast("Connected Successfullly");
    }, error => {
      this.showError(error);
    });
  }

  
  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.showToast("Device Disconnected");
  }


  handleData(data) {
    this.dataReceived=data.toString();
    console.log(this.dataReceived);
    this.showToast(data);
  }


  sendData() {
    this.dataSend+='\n';
    this.showToast(this.dataSend);

    this.bluetoothSerial.write(this.dataSend).then(success => {
      this.showToast(success);
    }, error => {
      this.showError(error)
    });
  }


  async showError(error) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    await alert.present();
  }


  async showToast(msj) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    await toast.present();

  }
}

interface pairedlist{
  "class": number,
  "id": string,
  "address": string,
  "name": string
}
