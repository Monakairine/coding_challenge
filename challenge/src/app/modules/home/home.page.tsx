import React from 'react';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import useFetchDataFromFiles from './useFetchDataFromFiles';
import { BillsModel, LegislatorsModel, VotesModel, VoteResultsModel, LegislatorOutputModel } from 'app/model/data.model';
import { files } from './files';
import { strings } from './strings';


function getBillsByVoteType(legislatorId: number, voteResults: VoteResultsModel[], votes: VotesModel[], bills: BillsModel[], voteType: number): Set<number> {
  const billsSet = new Set<number>();

  for (const voteResult of voteResults) {
    if (voteResult.legislator_id === legislatorId) {
      const voteId = voteResult.vote_id;
      const vote = votes.find((v) => v.id === voteId);

      if (vote) {
        const billId = vote.bill_id;
        const bill = bills.find((b) => b.id === billId);

        if (bill && Number(voteResult.vote_type) === voteType) {
          billsSet.add(billId);
        }
      }
    }
  }

  return billsSet;
}


function calculateVoteStatistics(
  legislators: LegislatorsModel[],
  bills: BillsModel[],
  voteResults: VoteResultsModel[],
  votes: VotesModel[]
): LegislatorOutputModel[] {
  const statistics: LegislatorOutputModel[] = [];

  for (const legislator of legislators) {
    const legislatorId = legislator.id;
    const supportedBills = getBillsByVoteType(legislatorId, voteResults, votes, bills, 1);
    const opposedBills = getBillsByVoteType(legislatorId, voteResults, votes, bills, 2);

    statistics.push({
      id: legislatorId,
      name: legislator.name,
      num_supported_bills: supportedBills.size,
      num_opposed_bills: opposedBills.size,
    });
  }

  return statistics;
}



export const HomePage: React.FC<Record<string, never>> = () => {

  const { data, isLoading } = useFetchDataFromFiles(files);

  const legislatorsStas = !isLoading ? calculateVoteStatistics(data.legislators, data.bills, data.voteResults, data.votes) : [];


  return (
    <React.Fragment>
      <Header />
      <h1>Legislator Analysis</h1>
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
          <strong>Name:</strong> {legislatorStat.name}, <strong>ID:</strong> {legislatorStat.id},{' '}
          <strong>Supported Bills:</strong> {legislatorStat.num_supported_bills},{' '}
          <strong>Opposed Bills:</strong> {legislatorStat.num_opposed_bills}
        </li>
      ))}   



      <Footer />
    </React.Fragment>
  );
};

export default HomePage;






