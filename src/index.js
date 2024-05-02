// index.js or App.js
import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n'; // Import your i18n instance
import App from './App'; // Your root component


// Dynamically set the dir attribute of the HTML tag based on the language direction
const setLanguageDirection = (lang) => {
  document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
};


const renderApp = () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
    </BrowserRouter>
      </Suspense>

    </I18nextProvider>,
    document.getElementById('root')
  );
};

// Render the app and set the language direction
const renderWithLanguageDirection = (lang) => {
  setLanguageDirection(lang);
  renderApp();
};

// Render the app initially
renderApp();

// Listen for language change events and update direction accordingly
i18n.on('languageChanged', (lang) => {
  setLanguageDirection(lang);
});

// You can also call renderWithLanguageDirection function wherever you change the language dynamically
