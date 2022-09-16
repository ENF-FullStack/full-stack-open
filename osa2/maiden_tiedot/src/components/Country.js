const Country = ({ search, countries }) => {
    
    let filterCountry = 
        countries.filter((country) => 
        country.name.common
            .toUpperCase()
            .includes(search.toUpperCase()) || search === '')
            .map((country, index) => (
                <p key={index}>{country.name.common}</p>
                
            ))

    if (filterCountry.length === 1) {

        let filterLang = 
        countries.filter((country) => 
        country.name.common
            .toUpperCase()
            .includes(search.toUpperCase()) || search === '')
            .map((country, index) => 
                Object.values(country.languages)
                .map((lang, index) => <li key={index}>{lang}</li>))
              
        return (
            <div>
                {countries.filter((country) =>
                    country.name.common
                        .toUpperCase()
                        .includes(search.toUpperCase()) || search === '')
                        .map((country, index) =>
                        <div key = {index}>
                            <h2>{country.name.common}</h2>
                            Capital: {country.capital}<br />
                            {country.area}
                            <h4>Languages:</h4>
                            <ul>{filterLang}</ul>
                            <img src={country.flags.png} alt="flag" />
                        </div>
                        )
                }
            
            </div>
        )
    }

    if (filterCountry.length >= 10 ) {
        return (
            <div>Too many hits, narrow your search</div>
        )
    }

    if (filterCountry.length < 10) {
        return (
            <div>
                {filterCountry}<br />
            </div>
        )
    }
 
    /*
    let filterCountry = countries.filter((country) => country.name.common.toUpperCase().includes(search.toUpperCase()) || search === '')

    // .map((country, index) => (<p key={index}>{country.name.common}</p>))
 
    filterCountry.map((country, index) => {
        return <p key={index}>{country.name.common}</p>;
    })
        
    if (fC.length === 1) {
        const langs = fC.country.languages
        // const langs = country.languages
        const keys = Object.values(langs)

        return (
            <div key={index}>
                <h3>{country.name.common}</h3>
                <p>{country.capital}</p>
                <p>{country.area}</p>
                <h4>Languages:</h4>
                <ul>
                    {keys.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
            </div>
        )
    }
    */
    
}

export default Country