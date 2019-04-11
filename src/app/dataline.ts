export class Dataline {
  humidity: number = 0;
  temperature: number = 0;
  co:  number = 0;
  co2: number = 0;
  nh4: number = 0;
  eth: number = 0;
  tol: number = 0;
  ace: number = 0;
  coords: Coordinates;
  lat: Number;
  lon: Number;
  time: String;
  date: String;
  constructor(hum:number,tem:number,co:number,co2: number,nh4: number,eth: number,tol: number,ace: number,coords:Coordinates){
    this.humidity=hum;
    this.temperature=tem;
    this.co = co;
    this.co2 = co2;
    this.nh4 = nh4;
    this.eth = eth;
    this.tol = tol;
    this.ace = ace;
    this.time = new Date().toLocaleTimeString();
    this.date = new Date().toLocaleDateString();
    this.coords = coords;
    this.lat = coords.latitude;
    this.lon = coords.longitude;
  }  
}
