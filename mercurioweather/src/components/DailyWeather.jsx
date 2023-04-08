import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"


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
        <ListGroup>
            {data[0].list.map((day,i) => (
                <ListGroup.Item key={i} >
                    <p>Description: {day.weather[0].id}</p>
                    <p>Min/Max Temp: {day.main.temp_min.toFixed(0)}° / {day.main.temp_max.toFixed(0)}°</p>
                </ListGroup.Item>
            )
            )
            }
        </ListGroup>
        ))
      )
}

export default DailyWeather