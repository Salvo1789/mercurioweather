import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"
import moment from 'moment';

const DailyWeather = () => {
    const coordinates = useSelector((state) => state.coordinates)
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async (url) => {
          try {
            const response = await fetch(url)
            if (response.ok) {
              const weatherDailyData = await response.json()
              setData([weatherDailyData]);
            } else {
              console.log("Data fetching error")
            }
          } catch (error) {
            console.log(error)
          } 
        };
    
        if (coordinates.length > 0) {
          const queryParam = new URLSearchParams(coordinates[0]).toString()
          fetchData(`${process.env.REACT_APP_FORECAST_API_URL}${queryParam}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        }
      }, [coordinates])
      console.log(data)
      return(
        (data.length > 0 && (
        <ListGroup className="mb-5">
            {data[0].list.slice(1,7).map((day,i) => (
                <ListGroup.Item key={i} style={{ background: "transparent", border: "solid white 3px", borderRadius: "5px"}}>
                  <p className="text-light">Day: {moment().add(i+1, 'days').format('dddd')}</p>
                    <p className="text-light">Date: {moment().add(i, 'days').format('LL')}</p>
                    <p className="text-light">Temperature: {day.main.temp}</p>
                    <p className="text-light">Description: {day.weather[0].main} <img src ={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt='weather description' width="80" height="80"/></p>
                    <p className="text-light">Min/Max Temp: {day.main.temp_min.toFixed(0)}° / {day.main.temp_max.toFixed(0)}°</p>
                </ListGroup.Item>
            )
            )
            }
        </ListGroup>
        ))
      )
}

export default DailyWeather