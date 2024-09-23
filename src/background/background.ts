import { fetchOpenWeatherData } from '../utils/api';

import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
} from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    autoLayout: false,
    homeCity: '',
    tempScale: 'metric',
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add Weather for this city',
    id: 'weatherExtension',
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add To Home City',
    id: 'weatherExtensionHomeCity',
  });

  chrome.alarms.create({
    periodInMinutes: 1/30,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === 'weatherExtension') {
    // Handle the first context menu action
    getStoredCities().then((cities) => {
      setStoredCities([...cities, event.selectionText]);
    });
  } else if (event.menuItemId === 'weatherExtensionHomeCity') {
    // Handle the second context menu action (set as Home City)
    setStoredOptions({
      autoLayout: true,
      homeCity: event.selectionText,
      tempScale: 'metric',
    });
  }
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === '') {
      return;
    }

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';

      chrome.action.setBadgeText({
        text: `${temp}${symbol}`,
      });
    });
  });
});
