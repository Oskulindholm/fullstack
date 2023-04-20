import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

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

      <CountryList filter={filter} countries={countries} handler={showCountry} />
    </div>
  )
}

/// COUNTRYLIST component renders the list of all countries that match the filter.
const CountryList = ({filter, countries, handler}) => {

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
              <Country country={matches[0]} />
            </>
        )
    } else {
        return (
            <>No countries match the current search term.</>
        )
    }
}


/// COUNTRY component displays the basic information related to a single country
const Country = ({country}) => {

    const languages = Object.keys(country.languages).map(key => {return country.languages[key]})
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]


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
      </>
    )
}

export default App
