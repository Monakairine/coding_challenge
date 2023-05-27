import { VoteResultsModel, VotesModel, BillsModel, LegislatorOutputModel, LegislatorsModel } from "app/model/data.model";


export const getBillsByVoteType = (
  legislatorId: number,
  voteResults: VoteResultsModel[],
  votes: VotesModel[],
  bills: BillsModel[],
  voteType: number
): Set<number> => {
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
};

export const calculateVoteStatistics = (
  legislators: LegislatorsModel[],
  bills: BillsModel[],
  voteResults: VoteResultsModel[],
  votes: VotesModel[]
): LegislatorOutputModel[] => {
  const statistics: LegislatorOutputModel[] = [];

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
      num_supported_bills: supportedBills.size,
      num_opposed_bills: opposedBills.size,
    });
  }

  return statistics;
};



export const downloadCSV = (data: LegislatorOutputModel[]) => {
  const csvContent = [
    Object.keys(data[0]).join(","), // Header row
    ...data.map((item) => Object.values(item).join(",")), // Data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "legislators-support-oppose-count.csv";
  a.click();
  URL.revokeObjectURL(url);
};

