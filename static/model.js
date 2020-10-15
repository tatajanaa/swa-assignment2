

const model = (data, forecast) => {
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
        return [Math.max(...data.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
    }
      
    const getMinTemperature = function () {
        return [Math.min(...data.filter(item => new Date(item.time) >= getDay() && item.type === 'temperature').map(item => item.value))]
    }
    
    const getSum = function () {
        return data.filter(item => new Date(item.time) >= getDay() && item.type === 'precipitation')
         .map(item=>item.value)
         .reduce((a, b) => (a + b))
       
    }

    const getAverageWind = function () {
        let arr = data.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed');
        return arr.reduce((a, b) => a + b.value, 0) / arr.length
    }
    
    const getAverageCloud = function () {
        let arr = data.filter(item => new Date(item.time) >= getDay() && item.type === 'cloud coverage');
        return arr.reduce((a, b) => a + b.value, 0) / arr.length
    }

    const getDominantWindDirection = function (){
        let arr = data.filter(item => new Date(item.time) >= getDay() && item.type === 'wind speed')
        .map(item=>item.direction)
        .reduce(reducer, {});
            
        return Object.keys(arr).find(key => arr[key] === Math.max(...Object.values(arr)));
            
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