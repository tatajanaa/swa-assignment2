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
 
function weatherHistory(_data) {
    const data = [..._data] 
    const getData = () => [...data]
    const including = weatherData => weatherHistory( [...data, weatherData])
    const forPlace = (newPlace) => weatherHistory( data.filter(item => item.place === newPlace))
    const forType = newType => weatherHistory( data.filter(item => item.type === newType))
    const forPeriod = period => weatherHistory( data.filter(item=> containsDate(item.time, period)))

    const lowestValue = () => (data.lenght != 0 || 
                                !weatherHistory || 
                                 !(data.map(item=>item.type).reduce(function(a,b){return(a === b)? a : undefined}) )
        ? (Math.min(...data.map(item=>item.value.value)) )
        :undefined  )
    
        const convertToUsUnits = () => weatherHistory([...data], data.filter(item => item.unit === 'INT').map(item=>convert(item)))
 
        const convertToInternationalUnits = () => weatherHistory([...data], data.filter(item => item.unit === 'US').map(item=>convert(item)))
     
        return { getData, including, forPlace, forType, forPeriod, lowestValue, convertToUsUnits, convertToInternationalUnits}
} 

const convert=function(element){
 
    switch (element.type) {
        case 'temp':
            element.unit === 'INT'
             ? (element.value.value=convertToF(element.value.value), element.unit='US') 
             : (element.value.value=convertToC(element.value.value), element.unit='INT')    
                console.log(element.value.value)
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

function matches(to, from, weatherData){
    let isMatch = false
    if(weatherData.value.value <= to && weatherData.value.value >= from) {
        isMatch = true;
    }
    return isMatch
}


function weatherForecast (_data) {
    const data = [..._data] 
    const getData = () => [...data]
    const including = weatherPrediction => weatherForecast( [...data, weatherPrediction])
    const forPlace = (newPlace) => weatherForecast( (data.map(item=>item.weatherData).filter(item => item.place === newPlace)))
    const forType = newType => weatherForecast( data.map(item=>item.weatherData).filter(item => item.type === newType))
    const forPeriod = period => weatherForecast( data.map(item=>item.weatherData).filter(item=> containsDate(item.time, period)))

    const averageFromValue =  () => ((data.map(item=>item.from).reduce((a, b) => (a + b)) /(data.map(item=>item.from).length)))
      
    const averageToValue =  () => ((data.map(item=>item.to).reduce((a, b) => (a + b)) /(data.map(item=>item.to).length)))
     
    const convertToUsUnits = () => weatherHistory([...data], data.map(item=>item.weatherData).filter(item => item.unit === 'INT').map(item=>convert(item)))
 
    const convertToInternationalUnits = () => weatherHistory([...data], data.map(item=>item.weatherData).filter(item => item.unit === 'US').map(item=>convert(item)))
   
    return { getData, including, forPlace, forType, forPeriod, averageFromValue, averageToValue, convertToUsUnits, convertToInternationalUnits}
} 


let h =  weatherHistory([])
let w =  weatherForecast([])



e = new WeatherData({value:12, subtype:'west'}, new Date(2000, 8, 01, 12,00,00), 'Horsens', 'temp', 'INT')
b =  new WeatherData({value:-112}, new Date(2020, 9, 06, 12,00,00), 'Kolding', 'temp', 'INT')
c =  new WeatherData({value:32}, new Date(2020, 9, 07, 12,00,00), 'Horsens', 'temp', 'US')

h = h.including(e)
h = h.including(b)
h = h.including(c)


var from = new Date(2020, 9, 01, 00,00,00)
var to = new Date(2021, 11, 19, 00,00,00)

let di = new DateInterval(from, to)

console.log(matches(10,45,c))

 wp = new WeatherPrediction(10,25,e)
 wp1 = new WeatherPrediction(0,250,b)
 wp2 = new WeatherPrediction(13,25,c)


w = w.including(wp)
w = w.including(wp1)
w = w.including(wp2)

//console.log((w.convertToUsUnits()).getData())


//console.log((h.forPlace('Kolding')).getData())

//console.log((h.forType('temp')).getData())

//console.log((h.forPeriod(di)).getData())


//console.log(h.lowestValue())

//console.log((h=h.convertToInternationalUnits()).getData())
//console.log(h.convertToUsUnits()).getData())







