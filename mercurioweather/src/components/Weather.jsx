import React from 'react';
import './styles.css';
import { Card } from 'react-bootstrap';
import moment from 'moment';

const WeatherCard = ({weatherData}) => (
  <Card >
    <Card.Header className="header bg-secondary text-light">City Name: {weatherData.name}</Card.Header>
    <Card.Body className = "bg-primary">
        <p>Temperature: {weatherData.main.temp} &deg;C</p>
        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Description: {weatherData.weather[0].main}</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Day: {moment().format('dddd')}</p>
        <p>Date: {moment().format('LL')}</p>
    </Card.Body>
  </Card>
)

export default WeatherCard;