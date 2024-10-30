const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "1af266bfc522957847b58dfcb0dded04";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city)
            weatherInfoDisplay(weatherData)
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }
    else{
        displayError("Please Input a city")
    }

})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl)
    
    if(!response.ok){
        displayError("Failed to fetch weather data")
    }
    else{
        return await response.json()
    }
}


function weatherInfoDisplay(data){
    const {name:city, 
           main:{humidity, temp}, 
           weather:[{description, id}]} = data

    card.textContent =""
    card.style.display ="flex"

    const cityDisplay = document.createElement("p")
    cityDisplay.textContent = city
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay)
    
    const tempDisplay = document.createElement("p")
    tempDisplay.textContent = `${(temp - 273).toFixed(1)}C`
    cityDisplay.classList.add("tempDisplay")
    card.appendChild(tempDisplay)

    const humidityDisplay = document.createElement("p")
    humidityDisplay.textContent = `Humidity:${humidity}`
    humidityDisplay.classList.add("humidityDisplay")
    card.appendChild(humidityDisplay)

    const descDisplay = document.createElement("p")
    descDisplay.textContent = description
    descDisplay.classList.add("descDisplay")
    card.appendChild(descDisplay)

    const weatherEmoji = document.createElement("p")
    weatherEmoji.textContent = getWeatherEmoji(id)
    weatherEmoji.classList.add("weatherEmoji")
    card.appendChild(weatherEmoji)

}

function getWeatherEmoji(id){
    switch(true){
        case (id >= 200 && id <300):
            return "⛈️"
            
        case (id >= 300 && id < 500):
                return "🌦️"
        
        case (id >= 500 && id < 600):
                return "🌧️"
        
        case (id >= 600 && id < 700):
                return "❄️"

        case (id >= 701 && id < 800):
                return "💨"
    
        case (id === 800):
                return "☀️"
        
        case (id >= 801):
                return "☁️"
        
        default:
            return "🏃"
            
    }

}

function displayError(message){
    card.textContent =""
    card.style.display ="flex"

    const error = document.createElement("p")
    error.textContent = message
    error.classList.add("errorDisplay")
    card.appendChild(error)
  
}



