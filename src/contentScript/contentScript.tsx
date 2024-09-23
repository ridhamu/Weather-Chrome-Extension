import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './contentScript.css';
import { Card } from '@mui/material';
import WeatherCard from '../components/weathercard';
import { getStoredOptions, LocalStorageOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.autoLayout);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayWeatherCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  );
};

const rootContainer = document.createElement('div');
const root = createRoot(rootContainer);
document.body.appendChild(rootContainer);

root.render(<App />);
