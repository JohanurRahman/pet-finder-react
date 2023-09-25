import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adobe Me!</Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/" element={<SearchParams />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
