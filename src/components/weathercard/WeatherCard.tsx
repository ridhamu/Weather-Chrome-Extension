import { useEffect, useState } from 'react';
import React from 'react';
import {
  getWeatherIconSrc,
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherDataTempscale,
} from '../../utils/api';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  Grid2,
} from '@mui/material';
import './WeatherCard.css';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <>
      <Box mx={'4px'} my={'16px'}>
        <Card variant="outlined">
          <CardContent>{children}</CardContent>
          <CardActions>
            {onDelete && (
              <Button color="secondary" onClick={onDelete}>
                <Typography className="bodyFont">Delete</Typography>
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

type Status = 'ready' | 'loading' | 'error';

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherDataTempscale;
  onDelete?: () => void;
}> = ({ city, onDelete, tempScale }) => {
  const [weatherInfo, setWeatherInfo] = useState<OpenWeatherData | null>(null);
  const [weatherDataStatus, setWeatherDataStatus] = useState<Status>('loading');
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        console.log(`nama kota adalah: ${data.name}`);
        setWeatherInfo(data);
        setWeatherDataStatus('ready');
      })
      .catch((err) => setWeatherDataStatus('error'));
  }, [city, tempScale]);

  if (weatherDataStatus === 'error' || weatherDataStatus === 'loading') {
    return (
      <>
        <WeatherCardContainer onDelete={onDelete}>
          <Typography className="headingFont">{city}</Typography>
          <Typography className="bodyFont">
            {weatherDataStatus === 'loading'
              ? 'Retrieving data ....'
              : `Error: could not retrieve data for city ${city}`}
          </Typography>
        </WeatherCardContainer>
      </>
    );
  }
  return (
    <>
      <WeatherCardContainer onDelete={onDelete}>
        <Grid2 container justifyContent={'space-around'}>
          <Grid2>
            <Typography className="headingFont">{weatherInfo.name}</Typography>
            <Typography className="bodyFont-Temp">
              {Math.round(weatherInfo.main.temp)}&deg;
              {tempScale === 'metric' ? 'C' : 'F'}
            </Typography>
            <Typography className="bodyFont">
              Feels Like: {Math.round(weatherInfo.main.feels_like)}&deg;
              {tempScale === 'metric' ? 'C' : 'F'}
            </Typography>
          </Grid2>
          <Grid2>
            {weatherInfo.weather.length > 0 && (
              <>
                <img src={getWeatherIconSrc(weatherInfo.weather[0].icon)} />
                <Typography>{weatherInfo.weather[0].main}</Typography>
              </>
            )}
          </Grid2>
        </Grid2>
      </WeatherCardContainer>
    </>
  );
};

export default WeatherCard;
