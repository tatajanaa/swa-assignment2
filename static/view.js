export default window => {
    const document = window.document
    const weatherDataDiv = document.getElementById('weather_data')
    const listeners = []

    const listen = l => listeners.push(l)

    const MaxTemp = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The maximal temperature in last five days was: ' + p))
                
  
     }
     const MinTemp = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The minimal temperature in last five days was: ' + p))
               
  
     }

     const GetSum = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The total precipitation in last five days was: ' + p))
               
  
     }

     const GetAverageWindSpeed = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The average wind speed in last five days was: '+p))
               
  
     }

     const GetAverageCloudCoverage = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The average cloud coverage in last five days was: ' +p))
               
  
     }

     const GetDominantWindDirection = p => {

        console.log('p is '+p)
         const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
         paragraph.appendChild(document.createTextNode('The dominant wind directon in last five days was: ' + p))
               
  
     }

     const GetLatestMeasurement =p =>{
        console.log('p is '+p)
        const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
        paragraph.appendChild(document.createTextNode('Lates measurements were: ' + p))
     }

     const GetHourlyPredictions = p =>{
        console.log('p is '+p)
        const paragraph = weatherDataDiv.appendChild(document.createElement('p'))
        paragraph.appendChild(document.createTextNode('Hourly predictions for the next 24 hours: ' + p))
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
