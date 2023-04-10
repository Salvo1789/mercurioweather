import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Weather from './Weather'
import DailyWeather from './DailyWeather'
import SiteFooter from './SiteFooter'
import './styles.css'

const WeatherSearch = () => {
    const [query, setQuery] = useState("")

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const geoUrl = `${process.env.REACT_APP_GEO_API_URL}&q=${query}&appid=${process.env.REACT_APP_API_KEY}`

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
        <div style={{backgroundImage: 'linear-gradient(180deg, blue, forestgreen)'}} className="container">
          <div  className="row">
            <div className="col-12">
              <h1 >Mercurio Weather</h1>
            </div>
            <div className="col-12">
              <form className="pb-2" onSubmit={handleSubmit}>
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
          </div>
            <div className="row">
            <div className="col-12 col-md-6 mb-2 mb-md-0">
              <Weather />
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0">
               <DailyWeather />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <SiteFooter />
            </div>
          </div>
        </div>
      );
}

export default WeatherSearch