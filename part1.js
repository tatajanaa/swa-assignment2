
  
  const convertToF =  (value) => Math.round((value * (9 / 5)) + 32)
  const convertToC =  (value) => Math.round((value - 32) * (9 / 5))
  const convertToMM = (value) => value * 25.4
  const convertToInches = (value) => value / 25.4;
  const convertToMPH = (value) => value  * 2.2369362920544
  const convertToMS = (value) => value * 0.44704


class DateInterval{
    constructor(from, to){
        this.from = from
        this.to = to
    }

}
let containsDate = function (d, interval) {
   return d >= interval.from && d <= interval.to
}


class Event {
    constructor(time, place) {
        this.time =  time
        this.place = place
    }
}

class WeatherData extends Event {
    constructor(value, time, place, type, unit) {
        super(time, place)
        this.value = value
        this.unit = unit
        this.type=type
    }

}

class WeatherHistory {
    data;
    constructor() {
         this.data =  []
    }
  

 }


WeatherHistory.prototype.including = function (weatherData) {this.data.push(weatherData)}

WeatherHistory.prototype.data = function(){return data}

WeatherHistory.prototype.forPlace = function (newPlace){
      return this.data.filter(item => item.place === newPlace);   
}

WeatherHistory.prototype.forType = function (newType){
    return this.data.filter(item => item.type === newType);  
}

WeatherHistory.prototype.forPeriod = function (period){
     return this.data.filter(item=> containsDate(item.time, period))
}

WeatherHistory.prototype.lowestValue = function() {

    if(!this.data.length || !WeatherHistory ){  
        return undefined
    }

    else if(!this.data.map(item=>item.type).reduce(function(a,b){return(a === b)? a : undefined})){

         return undefined
   
    }
    else 
        return Math.min(...this.data.map(item=>item.value.value))
   
}


WeatherHistory.prototype.convertToUsUnits = function (){
  this.data.filter(item => item.unit === 'INT').map(item=>convert(item))
  return this.data

}

WeatherHistory.prototype.convertToInternationalUnits = function (){
    this.data.filter(item => item.unit === 'US').map(item=>convert(item))
    return this.data
  
  }


const convert=function(element){
   
    switch (element.type) {
        case 'temp':
            element.unit === 'INT'
             ? (element.value.value=convertToF(element.value.value), element.unit='US') 
             : (element.value.value=convertToC(element.value.value), element.unit='INT')    
           
            break;
        case 'precipitation':
            element.unit === 'INT'
            ? (element.value.value=convertToInches(element.value.value), element.unit='US') 
            : (element.value.value=convertToMM(element.value.value), element.unit='INT')  
           
            break;
        case 'wind':
            element.unit === 'INT'
            ? (element.value.value=convertToMPH(element.value.value), element.unit='US') 
            : (element.value.value=convertToMS(element.value.value), element.unit='INT') 
           
            break;
    }
}


class WeatherPrediction {
    constructor(from, to, weatherData){
        this.from = from
        this.to = to
        this.weatherData = weatherData
    }
}

WeatherPrediction.prototype.matches = function () {
    let isMatch = false
    if(this.weatherData.value.value <= this.to && this.weatherData.value.value >= this.from) {
        isMatch = true;
    }
    return isMatch
}

class WeatherForecast {
    data;
    constructor() {
         this.data =  []
    }
 }

 WeatherForecast.prototype.including = function (weatherPrediction) {this.data.push(weatherPrediction)}

 WeatherForecast.prototype.data = function(){return data}
 
 WeatherForecast.prototype.forPlace = function (newPlace){
       return this.data.filter(item => item.place === newPlace);   
 }
 
 WeatherForecast.prototype.forType = function (newType){
     return this.data.filter(item => item.type === newType);  
 }
 
 WeatherForecast.prototype.forPeriod = function (period){
      return this.data.filter(item=> containsDate(item.time, period))
 }
 
 
 
 WeatherForecast.prototype.convertToUsUnits = function (){
   this.data.filter(item => item.unit === 'INT').map(item=>convert(item))
   return this.data
 
 }
 
 WeatherForecast.prototype.convertToInternationalUnits = function (){
     this.data.filter(item => item.unit === 'US').map(item=>convert(item))
     return this.data
   
   }

WeatherForecast.prototype.averageFromValue = function (){
     let from =  this.data.map(item=>item.from)
        return from.reduce((a, b) => (a + b)) / from.length;
   }

   WeatherForecast.prototype.averageToValue = function (){
    let to =  this.data.map(item=>item.to)
       return to.reduce((a, b) => (a + b)) / to.length;
  }

let h = new WeatherHistory({data: []})


e = new WeatherData({value: 12, subtype: 'north west'}, new Date(2000, 8, 01, 12,00,00)   , 'Horsens', 'temp', 'INT')
b = new WeatherData({value: -132, subtype: 'rain'}, new Date(2020, 9, 06, 12,00,00), 'Kolding', 'temp', 'INT')
c = new WeatherData({value:34}, new Date(2020, 9, 07, 12,00,00), 'Horsens', 'temp', 'US')

h.including(e)
h.including(b)
h.including(c) 

let wf = new WeatherForecast({data: []})

let wp = new WeatherPrediction(13,25,e)
let wp1 = new WeatherPrediction(0,250,b)
let wp2 = new WeatherPrediction(13,25,c)

wf.including(wp)
wf.including(wp1)
wf.including(wp2)


var from = new Date(2020, 9, 01, 00,00,00)
var to = new Date(2020, 9, 15, 00,00,00)


let di = new DateInterval(from, to)

//console.log(h.lowestValue())
//console.log(h.forPeriod(di))
//console.log(h.convertToInternationalUnits())




