import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserContextProvider } from './context/user-context';
import './index.css'
import './styles/tailwind.css'

ReactDOM.render(
      <UserContextProvider>
          <App />
      </UserContextProvider>
  ,
  document.getElementById('root')
);


