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
  <Card >
    <Card.Header className="header bg-secondary text-light">City Name: {data[0].name}</Card.Header>
    <Card.Body className = "bg-primary">
        <p>Temperature: {data[0].main.temp} &deg;C</p>
        <p>Sunrise: {new Date(data[0].sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(data[0].sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Description: {data[0].weather[0].main}</p>
        <p>Humidity: {data[0].main.humidity} %</p>
        <p>Day: {moment().format('dddd')}</p>
        <p>Date: {moment().format('LL')}</p>
    </Card.Body>
  </Card>
  )
  )
)
}
export default Weather