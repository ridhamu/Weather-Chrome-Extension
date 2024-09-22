import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import WeatherCard from './weathercard';
import { Box, IconButton, InputBase, Paper, Grid2 } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import './popup.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string[]>([]);
  const [inputCity, setInputCity] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((result) => {
      setCityName(result);
    });
    getStoredOptions().then((result) => {
      setOptions(result);
    });
  }, []);

  const handleClickButton = (): void => {
    const updatedCityName: string[] = [...cityName, inputCity];
    setStoredCities(updatedCityName).then(() => {
      setCityName(updatedCityName);
      setInputCity('');
    });
  };

  const handleDeleteButton = (index: number) => {
    cityName.splice(index, 1);
    const updatedCityName: string[] = [...cityName];
    setStoredCities(updatedCityName).then(() => {
      setCityName(updatedCityName);
    });
  };

  const handleTempScaleButton = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };

    setStoredOptions(updateOptions).then(() => setOptions(updateOptions)); 
  };

  if (!options) {
    return null;
  }

  return (
    <>
      <Box mx={'2 px'} my={'2 px'}>
        <h1>Check City Weather in Real Time!</h1>
        {/* Input field to add new city */}
        <Grid2 container justifyContent={'space-evenly'}>
          <Grid2>
            <Paper>
              <Box px={'15px'} py={'4px'}>
                <InputBase
                  placeholder="add a city name"
                  value={inputCity}
                  onChange={(e) => setInputCity(e.target.value)}
                />
                <IconButton onClick={handleClickButton}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid2>
          <Grid2>
            <Paper>
              <IconButton onClick={handleTempScaleButton}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Paper>
          </Grid2>
        </Grid2>
        {cityName.map((city, index) => (
          <WeatherCard
            city={city}
            tempScale={options.tempScale}
            key={index}
            onDelete={() => handleDeleteButton(index)}
          />
        ))}
      </Box>
      <Box py={'8px'}></Box>
    </>
  );
};

const divRootContainer = document.createElement('div');
const root = createRoot(divRootContainer);
document.body.appendChild(divRootContainer);

root.render(<App />);
