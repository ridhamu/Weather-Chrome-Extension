import { useEffect, useState } from 'react';
import React from 'react';
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

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
                Delete
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
  onDelete?: () => void;
}> = ({ city, onDelete }) => {
  const [weatherInfo, setWeatherInfo] = useState<OpenWeatherData | null>(null);
  const [weatherDataStatus, setWeatherDataStatus] = useState<Status>('loading');
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        console.log(`nama kota adalah: ${data.name}`);
        setWeatherInfo(data);
        setWeatherDataStatus('ready');
      })
      .catch((err) => setWeatherDataStatus('error'));
  }, [city]);

  if (weatherDataStatus === 'error' || weatherDataStatus === 'loading') {
    return (
      <>
        <WeatherCardContainer onDelete={onDelete}>
          <Typography variant="body1">
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
        <Typography variant="h4">{weatherInfo.name}</Typography>
        <Typography variant="body1">
          Temperature: {Math.round(weatherInfo.main.temp)} &deg;C
        </Typography>
        <Typography variant="body1">
          Feels Like: {Math.round(weatherInfo.main.feels_like)} &deg;C
        </Typography>
      </WeatherCardContainer>
    </>
  );
};

export default WeatherCard;
