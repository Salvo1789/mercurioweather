import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Weather from './Weather'

const WeatherSearch = () => {
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const geoUrl = `${process.env.REACT_APP_GEO_API_URL}&appid=${process.env.REACT_APP_API_KEY}&q=${query}`

        const fetchWeatherData = async (url) => {
            try{
                const response = await fetch(url)
                if (response.ok){
                    const data = await response.json()
                    return data
                }else{
                    console.log('Results fetching error')
                }
            }catch(error){
                console.log(error)
            }
        }

        const CoordinatesQuery = await fetchWeatherData(geoUrl)
        dispatch({ type: "UPDATE_COORDINATES", payload: [{lat: CoordinatesQuery[0].lat, lon: CoordinatesQuery[0].lon }]})
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-6 offset-3">
              <h1>Mercurio Weather</h1>
            </div>
            <div className="col-6 offset-3">
              <form className="border-bottom border-3 pb-2" onSubmit={handleSubmit}>
                <input
                  type="search"
                  id="search"
                  className="form-control"
                  value={query}
                  onChange={handleChange}
                  placeholder="Choose a location"
                />
              </form>
            </div>
            <div className="col-6 offset-3">
              <Weather />
            </div>
            <div className="col-6 offset-3">
              
            </div>
          </div>
        </div>
      );
}

export default WeatherSearch