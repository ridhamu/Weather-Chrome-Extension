import React from 'react';
import { useEffect, useState } from 'react';
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';
import {
  Card,
  CardContent,
  Box,
  TextField,
  Grid2,
  Typography,
  Button,
  Switch
} from '@mui/material';
import '@fontsource/roboto';
import { createRoot } from 'react-dom/client';

type FormState = "save" | "saving"; 

const OptionsPage: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('save');  

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleTextInput = (homeCity: string): void => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSwitchAutoLayout = (autoLayout: boolean): void => {
    setOptions({
        ...options, 
        autoLayout
    })
  }

  const handleSaveButtonClick = (): void => {
    setFormState('saving'); 
    setStoredOptions(options).then(() => {
        setTimeout(() => {
            setFormState('save'); 
        }, 500); 
    }); 
  }

  if(!options){
    return null; 
  }

  const isDisabled: boolean = formState === 'saving'; 
  return (
    <>
      <Box px={'25%'} py={'5%'}>
        <Card variant="outlined">
          <CardContent>
            <Grid2 container rowSpacing={2} direction={'column'}>
              <Grid2 alignContent={'center'}>
                <Typography variant="h5">Weather Options</Typography>
              </Grid2>
              <Grid2>
                <TextField
                  id="outlined-controlled"
                  value={options.homeCity}
                  label="Home City"
                  placeholder="Enter your home city name..."
                  fullWidth
                  onChange={(e) => handleTextInput(e.target.value)}
                  disabled={isDisabled}
                />
              </Grid2>
              <Grid2>
                <Typography variant='body1'>Auto Layout</Typography>
                <Switch
                color='primary'
                checked={options.autoLayout}
                onChange={(event, checked) => handleSwitchAutoLayout(checked)}
                disabled={isDisabled}
                />
              </Grid2>
              <Grid2>
                <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={handleSaveButtonClick}
                disabled={isDisabled}
                >
                  Save
                </Button>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

const divRootContainer = document.createElement('div');
const root = createRoot(divRootContainer);
document.body.appendChild(divRootContainer);

root.render(<OptionsPage />);
