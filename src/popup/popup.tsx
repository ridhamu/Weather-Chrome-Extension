import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import WeatherCard from '../components/weathercard';
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Grid2,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import {
  setStoredCities,
  setStoredOptions,
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import { Messages } from '../utils/messages';
import './popup.css';
import '@fontsource/roboto';


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

  const handleOverlayButton = () => {
    chrome.tabs.query({
      active: true
    }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY); 
      }
    }); 
  };

  if (!options) {
    return null;
  }

  return (
    <>
      <Box mx={'2 px'} my={'2 px'}>
        <Box mx={'4px'} my={'16px'} display="flex" justifyContent="center">
          <Typography variant="h5" align="center">
            Check City Weather in Real Time!
          </Typography>
        </Box>

        {/* Input field to add new city */}
        <Grid2 container justifyContent={'center'} spacing={1}>
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
            <Paper
              sx={{
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={handleTempScaleButton}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Paper>
          </Grid2>
          <Grid2>
            <Paper
              sx={{
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={handleOverlayButton}>
                <PictureInPictureIcon />
              </IconButton>
            </Paper>
          </Grid2>
        </Grid2>
        {options.homeCity !== '' && (
          <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
        )}
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
