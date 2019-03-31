import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Platform } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var HomePage = /** @class */ (function () {
    function HomePage(bluetoothSerial, alertCtrl, toastCtrl, platform, geolocation) {
        var _this = this;
        this.bluetoothSerial = bluetoothSerial;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.geolocation = geolocation;
        this.pairedDeviceID = 0;
        this.listToggle = false;
        this.cardToggle = false;
        this.dataSend = "";
        this.dataReceived = "";
        this.locationsetbefore = false;
        this.trackPosition = function () {
            _this.geolocation.getCurrentPosition().then(function (position) {
                _this.handleMovement(position.coords);
            })
                .catch(function (error) {
                console.log("error", error);
            });
        };
        //  Removed from original as it serves no purpose
        geolocation.getCurrentPosition()
            .then(function (position) {
            _this.coords = position.coords;
        })
            .catch(function (error) {
            console.log('error', error);
        });
        this.checkBluetoothEnabled();
    }
    HomePage.prototype.checkBluetoothEnabled = function () {
        var _this = this;
        this.bluetoothSerial.isEnabled().then(function (success) {
            _this.showPaired();
        }, function (error) {
            _this.showError("Please Enable Bluetooth");
        });
    };
    HomePage.prototype.radioChange = function (num) {
        console.log(num);
        this.pairedDeviceID = num;
    };
    HomePage.prototype.showPaired = function () {
        var _this = this;
        this.bluetoothSerial.list().then(function (success) {
            _this.pairedList = success;
            _this.listToggle = true;
        }, function (error) {
            _this.showError("Please Enable Bluetooth");
            _this.listToggle = false;
        });
    };
    HomePage.prototype.selectDevice = function () {
        var Device = this.pairedList[this.pairedDeviceID];
        if (!Device.address) {
            this.showError('Select Device to connect');
            return;
        }
        var address = Device.address;
        console.log(address);
        var name = Device.name;
        console.log(name);
        this.connect(address);
    };
    HomePage.prototype.connect = function (address) {
        var _this = this;
        // Attempt to connect device with specified address, call app.deviceConnected if success
        this.bluetoothSerial.connect(address).subscribe(function (success) {
            _this.deviceConnected();
            _this.showToast("Successfully Connected");
        }, function (error) {
            _this.showError("Error:Connecting to Device");
        });
    };
    HomePage.prototype.deviceConnected = function () {
        var _this = this;
        // Subscribe to data receiving as soon as the delimiter is read
        this.bluetoothSerial.subscribe('\n').subscribe(function (success) {
            _this.handleData(success);
            //this.showToast("Connected Successfullly");
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.deviceDisconnected = function () {
        // Disconnect device
        this.bluetoothSerial.disconnect();
        this.showToast("Device Disconnected");
    };
    HomePage.prototype.handleData = function (data) {
        this.dataReceived = data.toString();
        var values = this.dataReceived.split(','); //splitting on delimiter
        // if(this.locationsetbefore == false){
        this.trackPosition; //setting initial coordinates
        this.locationsetbefore = true;
        // }
        console.log(Number(values[0]), Number(values[1]), Number(values[2]), Number(values[3]), Number(values[4]), Number(values[5]), Number(values[6]), Number(values[7]), this.coords);
        copy = new dataline(Number(values[0]), Number(values[1]), Number(values[2]), Number(values[3]), Number(values[4]), Number(values[5]), Number(values[6]), Number(values[7]), this.coords); //creating new item
        this.DataLine = copy; //copy to app display
        this.cardToggle = true;
    };
    HomePage.prototype.handleMovement = function (data) {
        this.coords = data;
        console.log(data);
        //this.showNotification();
    };
    HomePage.prototype.sendData = function () {
        var _this = this;
        this.dataSend += '\n';
        this.showToast(this.dataSend);
        this.bluetoothSerial.write(this.dataSend).then(function (success) {
            _this.showToast(success);
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.showError = function (error) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Error',
                            subHeader: error,
                            buttons: ['Dismiss']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showToast = function (msj) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msj,
                            duration: 1000
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [BluetoothSerial, AlertController,
            ToastController, Platform, Geolocation])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
var dataline = /** @class */ (function () {
    function dataline(hum, tem, co, co2, nh4, eth, tol, ace, loc) {
        this.humidity = 0;
        this.temperature = 0;
        this.co = 0;
        this.co2 = 0;
        this.nh4 = 0;
        this.eth = 0;
        this.tol = 0;
        this.ace = 0;
        this.humidity = hum;
        this.temperature = tem;
        this.co = co;
        this.co2 = co2;
        this.nh4 = nh4;
        this.eth = eth;
        this.tol = tol;
        this.ace = ace;
        this.time = new Date().toLocaleTimeString();
        this.date = new Date().toLocaleDateString();
        this.loc = loc;
    }
    return dataline;
}());
var copy;
//# sourceMappingURL=home.page.js.map