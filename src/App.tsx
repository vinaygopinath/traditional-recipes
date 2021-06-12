import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import CountryPage from './pages/country/CountryPage';

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback="Loading..">
         <Route exact path="/">
           <Redirect to="/kenya" />
         </Route>
        <Route path="/:country" component={CountryPage} />
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
