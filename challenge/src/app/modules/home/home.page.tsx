import React from 'react';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';


export const HomePage: React.FC<Record<string, never>> = () => {

  return (
    <React.Fragment>
      <Header />
      <h1>Legislators infos</h1>
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
