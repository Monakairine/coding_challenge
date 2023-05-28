import {
  VoteResultsModel,
  VotesModel,
  BillsModel,
  LegislatorStatsModel,
  LegislatorsModel,
  BillStatsModel,
} from "app/model/data.model";


export const getBillsByVoteType = (
  legislatorId: number,
  voteResults: VoteResultsModel[],
  votes: VotesModel[],
  bills: BillsModel[],
  voteType: number
): number[] => {
  const billsCounts = [];

  const relevantVoteResults = voteResults.filter(
      (voteResult) => voteResult.legislator_id === legislatorId
    );

  for (const voteResult of relevantVoteResults) {
      const voteId = voteResult.vote_id;
      const vote = votes.find((v) => Number(v.id) === Number(voteId));

      if (vote) {
        const billId = vote.bill_id;
        const bill = bills.find((b) => Number(b.id) === Number(billId));

        if (bill && Number(voteResult.vote_type) === voteType) {
          billsCounts.push(billId);
        }
      }
    }

  return billsCounts;
};

export const calculateVoteStatistics = (
  legislators: LegislatorsModel[],
  bills: BillsModel[],
  voteResults: VoteResultsModel[],
  votes: VotesModel[]
): LegislatorStatsModel[] => {
  const statistics: LegislatorStatsModel[] = [];

  for (const legislator of legislators) {
    const legislatorId = legislator.id;
    const supportedBills = getBillsByVoteType(
      legislatorId,
      voteResults,
      votes,
      bills,
      1
    );

    const opposedBills = getBillsByVoteType(
      legislatorId,
      voteResults,
      votes,
      bills,
      2
    );

    statistics.push({
      id: legislatorId,
      name: legislator.name,
      num_supported_bills: supportedBills.length,
      num_opposed_bills: opposedBills.length,
    });
  }

  return statistics;
};


export const calculateBillStatistics = (
  bills: BillsModel[],
  voteResults: VoteResultsModel[],
  legislators: LegislatorsModel[],
  votes: VotesModel[]
): BillStatsModel[] => {
  const billStatistics: BillStatsModel[] = [];

  for (const bill of bills) {
    const billId = bill.id;
    const primarySponsor = getPrimarySponsorName(legislators, bill.sponsor_id);
    const { supportCount, opposeCount } = getVoteCounts(
      votes,
      voteResults,
      billId
    );

    billStatistics.push({
      id: billId,
      title: bill.title,
      supporter_count: supportCount,
      opposer_count: opposeCount,
      primary_sponsor: primarySponsor,
    });
  }

  return billStatistics;
};

export const getPrimarySponsorName = (
  legislators: LegislatorsModel[],
  sponsorId: number
): string => {
  const primarySponsor = legislators.find(
    (legislator) => Number(legislator.id) === Number(sponsorId)
  );
  return primarySponsor?.name || "";
};

export const getVoteCounts = (
  votes: VotesModel[],
  voteResults: VoteResultsModel[],
  billId: number
): { supportCount: number; opposeCount: number } => {
  const filteredVotes = votes.filter((vote) => vote.bill_id === billId);
  const voteResultIds = filteredVotes.map((vote) => vote.id);
  const filteredVoteResults = voteResults.filter((vr) =>
    voteResultIds.includes(vr.vote_id)
  );

  const supportCount = filteredVoteResults.filter(
    (vr) => Number(vr.vote_type) === 1
  ).length;
  const opposeCount = filteredVoteResults.filter(
    (vr) => Number(vr.vote_type) === 2
  ).length;

  return { supportCount, opposeCount };
};



export const downloadCSV = <T>(data: T[], fileName: string) => {
  const csvContent = [
    Object.keys(data[0]).join(","), // Header row
    ...data.map((item) => Object.values(item).join(",")), // Data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};


