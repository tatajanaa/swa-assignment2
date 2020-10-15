

const model = (data, forecast, horsens, copenhagen, aarhus) => {
    const allWeatherData = () => data

    function getDay() {
        let d = new Date();
        return d.setDate(d.getDate() - 5);
    
    }

    const reducer = (map, val) => {
        if (map[val] == null) {
          map[val] = 1;
        } else {
          ++map[val];
        }
       
        return map;
       
    
      };
    

    const getMaxTemperature = function () {
           
       let maxHorsens =  [Math.max(...horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
       let maxCph =  [Math.max(...copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
       let maxAarhus =  [Math.max(...aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
    
        return       `The maximal temperature in  last five days was: Horsens: ${maxHorsens},
                    Copenhagen: ${maxCph}, Arhus: ${maxAarhus} `
    }
      
    const getMinTemperature = function () {

        let minHorsens = [Math.min(...horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
        let minCph = [Math.min(...copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
        let minAarhus = [Math.min(...aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]

        return       `The minimal temperature in  last five days was: Horsens: ${minHorsens},
        Copenhagen: ${minCph}, Arhus: ${minAarhus} `
    }
    
    const getSum = function () {
        let sumHorsens=  horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'precipitation')
         .map(item=>item.value).reduce((a, b) => (a + b))

        let sumCph=  copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'precipitation')
         .map(item=>item.value).reduce((a, b) => (a + b))

        let sumAarhus=  aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'precipitation')
         .map(item=>item.value).reduce((a, b) => (a + b))
       
         return       `The total precipitation in last five days was: Horsens: ${sumHorsens},
         Copenhagen: ${sumCph}, Arhus: ${sumAarhus} `
    }

    const getAverageWind = function () {
        let arrHorsens = horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        let arrCph = copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        let arrAarhus = aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
       
        let avgHorsens = Math.round(arrHorsens.reduce((a, b) => a + b.value, 0) / arrHorsens.length)        
        let avgCph = Math.round(arrCph.reduce((a, b) => a + b.value, 0) / arrCph.length)
        let avgAarhus = Math.round(arrAarhus.reduce((a, b) => a + b.value, 0) / arrAarhus.length)
     
        return       `The average wind speed in last five days was: Horsens: ${avgHorsens},
        Copenhagen: ${avgCph}, Arhus: ${avgAarhus} `
    }
    
    const getAverageCloud = function () {
        let arrHorsens = horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'cloud coverage');
        let arrCph = copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'cloud coverage');
        let arrAarhus = aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'cloud coverage');

        let avgHorsens = Math.round(arrHorsens.reduce((a, b) => a + b.value, 0) / arrHorsens.length)        
        let avgCph = Math.round(arrCph.reduce((a, b) => a + b.value, 0) / arrCph.length)
        let avgAarhus = Math.round(arrAarhus.reduce((a, b) => a + b.value, 0) / arrAarhus.length)


        return       `The average cloud coverage in last five days was: Horsens: ${avgHorsens},
        Copenhagen: ${avgCph}, Arhus: ${avgAarhus} `
    }

    const getDominantWindDirection = function (){
        let domHorsens = horsens.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        .map(item=>item.direction)
        .reduce(reducer, {});

        let domCph = copenhagen.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        .map(item=>item.direction)
        .reduce(reducer, {});

        let domArhus = aarhus.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        .map(item=>item.direction)
        .reduce(reducer, {});
            
        
        let h=  Object.keys(domHorsens).find(key => domHorsens[key] === Math.max(...Object.values(domHorsens)));
        let c=  Object.keys(domCph).find(key => domCph[key] === Math.max(...Object.values(domCph)));
        let a=  Object.keys(domArhus).find(key => domArhus[key] === Math.max(...Object.values(domArhus))); 

        return       `The dominant wind directon in last five days was: Horsens: ${h},
        Copenhagen: ${c}, Arhus: ${a} `
    }

    const getLatestMeasurement = function(){
      
        let  t =JSON.stringify(data.filter(item => item.type==='temperature').slice(- 1))
        let  p =JSON.stringify(data.filter(item => item.type==='precipitation').slice(- 1))
        let  w =JSON.stringify(data.filter(item => item.type==='wind speed').slice(- 1))
        let  c =JSON.stringify(data.filter(item => item.type==='cloud coverage').slice(- 1))
        

     
        return  t+p+w+c
    }
    //Hourly predictions for the next 24 hours.
    const getHourlyPredictions = function(){
    
       let c= forecast.filter(item=> new Date(item.time)>=new Date())
      
       
      console.log(new Date());

     //console.log(c)
        return c
    }

    return {allWeatherData, getMinTemperature, getMaxTemperature,
         getSum, getAverageWind, getAverageCloud, getDominantWindDirection,
         getLatestMeasurement, getHourlyPredictions}
}
export default model