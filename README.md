Using the application

#Prerequisites
  Node.js
  Ionic
  Cordova
  OpenJDK
  Android SDK
  Android Phone with USB Debugging Enabled
#Instructions 
  clone the git, run
      $ npm install
      $ npm install node-sass //linux $ sudo npm install --save-dev  --unsafe-perm node-sass
  in the root directory

then run 

$ ionic cordova run android --device
this might take long as ionic tries to add missing files from the config.xml
make sure your device shows up in adb by running
  $ adb devices
  this will give you a string of letters

