# Using the application

## Prerequisites
  * Node.js
  * Ionic
  * Cordova
  * OpenJDK
  * Android SDK
  * Gradle
  * Android Phone with USB Debugging Enabled
# Instructions 
  clone the git, run
  ``` 
      $ ionic cordova prepare android
      $ npm install
  ``` 
in the root directory,

then run 
```
$ ionic cordova run android
```
this might take long as ionic tries to add missing files from the config.xml
make sure your device shows up in adb by running
```
  $ adb devices
```

