import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './components/Router/routes';
import 'styles/index.css';
import 'fonts/Playlist/Playlist_Script.otf';
import 'fonts/Montserrat/Montserrat-Regular.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
