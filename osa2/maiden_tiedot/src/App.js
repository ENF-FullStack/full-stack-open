import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (event) => setSearch(event.target.value)

  useEffect(() => {
    //console.log('effect')
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        //console.log('promise done')
        setCountry(response.data)
      })
  }, [])
  
  return (
    <div>
      <Filter search={search} handle={handleSearch} />
      <Country search={search} countries={country} />
    </div>
  )
}

export default App