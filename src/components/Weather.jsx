import React, { useRef, useState } from 'react'
import './Weather.css'
import searchicon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);

    const inputref = useRef()

    const allIcons = {
        "01d": clear, "01n": clear,
        "02d": cloud, "02n": cloud,
        "03d": cloud, "03n": cloud,
        "04d": drizzle, "04n": drizzle,
        "09d": rain, "09n": rain,
        "10d": rain, "10n": rain,
        "13d": snow, "13n": snow,
    }

    const search = async (city) => {
        if (city === "") {
            alert("Enter a valid city name")
        } else{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const repsonse = await fetch(url)
            const data = await repsonse.json();
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temps: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            alert("Something went wrong")
        }
    }
    }

    return (
        <div className='weather'>
            <div className="search">
                <input ref={inputref} placeholder='Search' type="text" />
                <img src={searchicon} alt="" onClick={() => search(inputref.current.value)} />
            </div>
            <img className='weather-icon' src={weatherData.icon} alt="" />
            <p className='temp'>{weatherData.temps}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="cols">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="cols">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Kmph</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather