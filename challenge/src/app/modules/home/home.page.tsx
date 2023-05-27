import React from 'react';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import useFetchDataFromFiles from './useFetchDataFromFiles';
import { files } from './files';
import { strings } from './strings';
import { calculateVoteStatistics, downloadCSV } from './utils';


export const HomePage: React.FC<Record<string, never>> = () => {

  const { data, isLoading } = useFetchDataFromFiles(files);
  const legislatorsStas = !isLoading ? calculateVoteStatistics(data.legislators, data.bills, data.voteResults, data.votes) : [];

  return (
    <React.Fragment>
      <Header />
      <h1>{strings.title}</h1>
      <p>{strings.welcomeMessage}</p>
      <p>{strings.questionsMessage}</p>
      <ol>
        <li>{strings.question1}</li>
        <li>{strings.question2}</li>
      </ol>
      <p>{strings.datasetNote}</p>

      <h2>{strings.question1Answer}</h2>

      {legislatorsStas.map((legislatorStat) => (
        <li key={legislatorStat.id}>
          <strong>{strings.name}</strong> {legislatorStat.name}, <strong>{strings.id}</strong> {legislatorStat.id},{' '}
          <strong>{strings.supportedBills}</strong> {legislatorStat.num_supported_bills},{' '}
          <strong>{strings.opposedBills}</strong> {legislatorStat.num_opposed_bills}
        </li>
      ))}
      <button onClick={() => downloadCSV(legislatorsStas)}>
        {strings.download}
      </button>
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;






