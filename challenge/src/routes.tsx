import * as React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from 'app/modules/home/home.page';


export const AppRoutes: React.FC<Record<string, never>> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
