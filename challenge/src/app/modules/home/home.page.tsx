import React from 'react';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import useFetchDataFromFiles from './useFetchDataFromFiles';


export const HomePage: React.FC<Record<string, never>> = () => {

  const files = [
    { name: "bills", file: "data/bills.csv" },
    { name: "legislators", file: "data/legislators.csv" },
    { name: "voteResults", file: "data/vote-results.csv" },
    { name: "votes", file: "data/votes.csv" },
  ];

  const { legislators } = useFetchDataFromFiles(files);

  
  return (
    <React.Fragment>
      <Header />
      <h1>Legislator Analysis</h1>
      <p>
        Welcome to the Legislator Analysis webpage. Here, we have performed an analysis on a dataset containing information about legislators, bills, votes, and vote results.
      </p>
      <p>
        We have answered the following questions based on the dataset:
      </p>
      <ol>
        <li>For every legislator in the dataset, how many bills did the legislator support (voted for the bill)? How many bills did the legislator oppose?</li>
        <li>For every bill in the dataset, how many legislators supported the bill? How many legislators opposed the bill? Who was the primary sponsor of the bill?</li>
      </ol>
      <p>
        The results of the analysis will be displayed below. Please note that the dataset used for this analysis is provided separately.
      </p>

      <h2>List of Legislators</h2>
      <ul>
        {legislators.map((legislator: any) => (
          <li key={legislator.id}>{legislator.name} {legislator.id}</li>
        ))}
      </ul>


      <Footer />
    </React.Fragment>
  );
};

export default HomePage;






