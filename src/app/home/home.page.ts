import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DbService } from 'src/app/services/db.service'; // to get app services
import { Dataline } from 'src/app/dataline';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  pairedList: pairedlist;
  pairedDeviceID: number = 0;
  listToggle: boolean = false;
  cardToggle: boolean = false;
  dataSend: string = ""; // for start stop
  dataReceived: string = ""; //for start stop
  DataLine: Dataline;
  coords: Coordinates;

  list: AngularFirestoreCollection<Dataline>;


  constructor(
    private bg: BackgroundMode ,private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController,
    private toastCtrl: ToastController, public geolocation: Geolocation, public db: DbService, public afs: AngularFirestore) {
    this.checkBluetoothEnabled();
    this.list = this.afs.collection<Dataline>('data');
    // this.bg.enable();
  }

  addLine(line: Dataline) {
    setTimeout(() => {
      const param = JSON.parse(JSON.stringify(line));
      this.list.add(param);
    }, 5000);
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.showPaired();
    }, error => {
      this.showError("Please Enable Bluetooth")
    });
  }

  radioChange(num: number) {
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
      //this.showToast("Connected Successfullly");
    }, error => {
      this.showError(error);
    });
  }


  deviceDisconnected() {
    // Disconnect device
    this.bluetoothSerial.disconnect();
    this.showToast("Device Disconnected");
  }


  handleData(data) {
    this.dataReceived = data.toString();
    var values = this.dataReceived.split(','); //splitting on delimiter
    this.handleMovement()
    if(values[2]!=null && values[3]!=null && values[4] != null && values[5]!=null && values[6]!=null && values[7]!=null){
      //console.log(Number(values[0]), Number(values[1]), Number(values[2]), Number(values[3]), Number(values[4]), Number(values[5]), Number(values[6]), Number(values[7]), this.coords);

      copy = new Dataline(Number(values[0]), Number(values[1]), Number(values[2]),
        Number(values[3]), Number(values[4]), Number(values[5]), Number(values[6]), Number(values[7]), this.coords); //creating new item
      this.DataLine = copy; //copy to app display
      this.cardToggle = true;
      this.addLine(copy);
    }
  }


  handleMovement() {
    let locopt = {
      enableHighAccuracy: true,
      timeout: 5000
    }
    this.geolocation.getCurrentPosition(locopt).then(position => {
      this.coords = position.coords;
      console.log(this.coords.latitude);
      console.log(this.coords.longitude);
      console.log(this.coords.speed);
    })
      .catch(error => {
        console.log("error", error);
      });

  }


  sendData() {
    this.dataSend += '\n';
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
      duration: 2000
    });
    await toast.present();

  }

}


interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}



var copy: Dataline;
