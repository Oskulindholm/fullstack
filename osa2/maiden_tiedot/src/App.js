import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.trim())
  }

  const showCountry = (name) => {
    setFilter(name)
  }

  return (
    <div>
      Find countries: <input onChange={handleFilter} /> <br/>

      <CountryList filter={filter} countries={countries} handler={showCountry} api_key={api_key} />
    </div>
  )
}

/// COUNTRYLIST component renders the list of all countries that match the filter.
const CountryList = ({filter, countries, handler, api_key}) => {

  const matches = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (matches.length > 10) {
        return (
            <>
              Too many matches, specify another filter.
            </>
        )
    } else if (matches.length > 1) {
        return (
            <>
              {matches.map(c => <p key={c.name.common}> {c.name.common} <button onClick={() => handler(c.name.common)}>Show</button></p>)}
            </>
        )
    } else if (matches.length == 1 ) {
        return (
            <>
              <Country country={matches[0]} api_key={api_key} />
            </>
        )
    } else {
        return (
            <>No countries match the current search term.</>
        )
    }
}


/// COUNTRY component displays the basic information related to a single country
const Country = ({country, api_key}) => {

    const languages = Object.keys(country.languages).map(key => {return country.languages[key]})
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const [wind, setWind] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
          .then(res => {
              setTemperature(res.data.main.temp)
              setWind(res.data.wind.speed)
              setWeatherIcon(`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`)
          })
      }, [])    
  

    return (
      <>
        <h2>{country.name.common}</h2>
        <p>
          Capital: {country.capital}<br/>
          Area: {country.area} km2
        </p>

        <h3>Languages</h3>
        <ul>
            {languages.map(l => <li key={l}>{l}</li>) }
        </ul>
        
        <img src={country.flags.png} />
        
        <h3>Weather in {country.capital}</h3>
        <p>
          Temperature: {temperature} °C <br/>
          <img src={weatherIcon} />  <br/>
          Wind: {wind} m/s
        </p> 
      </>
    )
}

export default App
