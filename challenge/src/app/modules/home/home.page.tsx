import * as React from 'react';

import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import useFetchDataFromFiles from './useFetchDataFromFiles';
import { files } from './files';
import { strings } from './strings';
import { calculateBillStatistics, calculateVoteStatistics, downloadCSV } from './utils';
import { Body, H1, H2 } from 'app/components/atm.typography/typography.component.style';


export const HomePage: React.FC<Record<string, never>> = () => {

  const { data, isLoading } = useFetchDataFromFiles(files);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const legislatorsStas =  calculateVoteStatistics(data.legislators, data.bills, data.voteResults, data.votes);
  const billStats = calculateBillStatistics(data.bills, data.voteResults, data.legislators, data.votes)


  return (
    <>
      <Header />
      <H1>{strings.title}</H1>
      <Body>{strings.welcomeMessage}</Body>
      <ol>
        <li><Body>{strings.question1.question}</Body></li>
        <li><Body>{strings.question2.question}</Body></li>
      </ol>
      <Body>{strings.datasetNote}</Body>

      <H2>{strings.question1.subtitleAnswer}</H2>
      {legislatorsStas.map((legislatorStat) => (
        <li key={legislatorStat.id}>
          <strong>{strings.question1.name}</strong> {legislatorStat.name}, <strong>{strings.question1.id}</strong> {legislatorStat.id},
          <strong>{strings.question1.supportedBills}</strong> {legislatorStat.num_supported_bills},{' '}
          <strong>{strings.question1.opposedBills}</strong> {legislatorStat.num_opposed_bills}
        </li>
      ))}
      <button onClick={() => downloadCSV(legislatorsStas, "legislators-support-oppose-count.csv")}>
        {strings.download}
      </button>

      <H2>{strings.question2.subtitleAnswer}</H2>

      {billStats.map((bill) => (
        <li key={bill.id}>
          <strong>{strings.question2.bill}</strong> {bill.title}, 
          <strong>{strings.question2.supporters}</strong> {bill.supporter_count}, 
          <strong>{strings.question2.opposers}</strong> {bill.opposer_count}
        </li>
      ))}
      <button onClick={() => downloadCSV(billStats, "bills.csv")}>
        {strings.download}
      </button>
      <Footer />
    </>
  );
};

export default HomePage;






