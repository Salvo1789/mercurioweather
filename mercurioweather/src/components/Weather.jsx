import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './styles.css';
import { Card } from 'react-bootstrap';
import moment from 'moment';


const Weather = () => {
  const coordinates = useSelector((state) => state.coordinates)
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const weatherData = await response.json();
          setData([weatherData]);
        } else {
          console.log("Data fetching error");
        }
      } catch (error) {
        console.log(error)
      } 
    };

    if (coordinates.length > 0) {
      const queryParam = new URLSearchParams(coordinates[0]).toString();
      fetchData(`${process.env.REACT_APP_API_URL}${queryParam}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
    }
  }, [coordinates]);


return (
  (data.length > 0 && (
    
     <Card className={
      (data[0].weather[0].main == 'Clear') ? ((data[0].weather[0].icon) == '01d' ? 'card-clear-day' : 'card-clear-night') :
      ((data[0].weather[0].main == 'Clouds') ? 'card-cloudy' :
      ((data[0].weather[0].main == 'Rain') ? 'card-rain' : 'card-snow'))
     }>
    <Card.Header className="header text-light">City Name: {data[0].name} <img src ={`http://openweathermap.org/img/w/${data[0].weather[0].icon}.png`} alt='weather description' width="120" height="120"/></Card.Header>
    <Card.Body >
        <p className="text-light">Temperature: {data[0].main.temp} &deg;C</p>
        <p className="text-light">Sunrise: {new Date(data[0].sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="text-light">Sunset: {new Date(data[0].sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="text-light">Description: {data[0].weather[0].main}</p>
        <p className="text-light">Humidity: {data[0].main.humidity} %</p>
        <p className="text-light">Day: {moment().format('dddd')}</p>
        <p className="text-light">Date: {moment().format('LL')}</p>
    </Card.Body>
  </Card>
  )
  )
)
}
export default Weather