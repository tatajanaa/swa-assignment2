export default window => {
    const document = window.document
    const weatherDataDiv = document.getElementById('weather_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const MaxTemp = p => { 
        const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
        paragraph.appendChild(document.createTextNode(p)) 
    }       
    
const MinTemp = p => {

         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode(p))
    }

     const GetSum = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode(p))
               
  
     }

     const GetAverageWindSpeed = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode(p))
               
  
     }

     const GetAverageCloudCoverage = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode(p))
               
  
     }

     const GetDominantWindDirection = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode(p))
               
  
     }

     const GetLatestMeasurement =p =>{
        console.log('p is '+p)
        const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
        paragraph.appendChild(document.createTextNode( p))
     }

     const GetHourlyPredictions = p =>{
       
        const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
        paragraph.appendChild(document.createTextNode(p))
     }


    const update = model => {
        while (weatherDataDiv.firstChild) weatherDataDiv.removeChild(weatherDataDiv.firstChild)
        MaxTemp(model.getMaxTemperature())
        MinTemp(model.getMinTemperature())
        GetSum(model.getSum())
        GetAverageWindSpeed(model.getAverageWind())
        GetAverageCloudCoverage(model.getAverageCloud())
        GetDominantWindDirection(model.getDominantWindDirection())
        GetLatestMeasurement(model.getLatestMeasurement())
        GetHourlyPredictions(model.getHourlyPredictions())
        //model.allWeatherData().forEach(displayAllWeatherDataItem)
       }
      
    const prompt = window.prompt.bind(window)

    return { MaxTemp, MinTemp, GetSum, update, listen, prompt }
}
