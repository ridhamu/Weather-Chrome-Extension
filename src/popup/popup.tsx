import React, { ReactEventHandler, useState } from 'react';
import { createRoot } from 'react-dom/client';
import WeatherCard from './weathercard';
import { Box, IconButton, InputBase, Paper, Grid2 } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './popup.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string[]>([
    'Jakarta',
    'Malang',
    'Lhokseumawe',
  ]);

  const [inputCity, setInputCity] = useState<string>('');

  const handleClickButton = (): void => {
    setCityName([...cityName, inputCity]);
    setInputCity('');
  };

  const handleDeleteButton = (index: number) => {
    cityName.splice(index, 1);
    setCityName([...cityName]);
  };

  return (
    <>
      <Box mx={'2 px'} my={'2 px'}>
        <h1>Check City Weather in Real Time!</h1>
        {/* Input field to add new city */}
        <Grid2 container>
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
        </Grid2>
        {cityName.map((city, index) => (
          <WeatherCard
            city={city}
            key={index}
            onDelete={() => handleDeleteButton(index)}
          />
        ))}
      </Box>
    </>
  );
};

const divRootContainer = document.createElement('div');
const root = createRoot(divRootContainer);
document.body.appendChild(divRootContainer);

root.render(<App />);
