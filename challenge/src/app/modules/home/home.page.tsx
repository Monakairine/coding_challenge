import React from 'react';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import useFetchDataFromFiles from './useFetchDataFromFiles';
import { BillsModel, LegislatorsModel, VotesModel, VoteResultsModel, LegislatorOutputModel } from 'app/model/data.model';


const files = [
  { name: "bills", file: "data/bills.csv" },
  { name: "legislators", file: "data/legislators.csv" },
  { name: "voteResults", file: "data/vote_results.csv" },
  { name: "votes", file: "data/votes.csv" },
];

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

  const { legislators, bills, voteResults, votes } = data

  const legislatorsStas = !isLoading ? calculateVoteStatistics(legislators, bills, voteResults, votes) : [];


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






