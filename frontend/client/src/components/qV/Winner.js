import React, { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import "./Winner.css";

export default function Winner({ proposaID, optionsList }) {
  const {
    state: { contract, accounts },
  } = useEth();

  const [totalVotesList, setTotalVotesList] = useState(
    Array.from(new Array(optionsList.length))
  );
  let arr = [];
  const totalVotes = {};
  for (let i = 0; i < optionsList.length; i++) {
    totalVotes[i + 1] = 0;
  }
  const [winnerIndex, setWinnerIndex] = useState();
  const [winnerVotes, setWinnerVotes] = useState();
  const [winnerName, setWinnerName] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [totalVotesObject, setTotalVotesObject] = useState(totalVotes);
  useEffect(() => {
    const fetchTotalVotes = async () => {
      try {
        for (let i = 0; i < optionsList.length; i++) {
          const res = await contract.methods.getWeight(proposaID, i + 1).call();
          totalVotesList[i] = res;
          setTotalVotesObject({ [i + 1]: res });
          setTotalVotesList(totalVotesList);
          console.log("res from total votes", totalVotesList);
        }
      } catch (err) {
        console.log("Error in fetching total votes", err);
      }
    };
    fetchTotalVotes();

    const getWinner = async () => {
      try {
        const res = await contract.methods.countVotes(proposaID).call();
        setWinnerIndex(res[0]);
        setWinnerVotes(res[1]);
        setWinnerName(res[2]);
        console.log("res from getWinner", res);
      } catch (err) {
        console.log("error in getWinner", err);
      }
    };
    getWinner();
    setIsComplete(true);
  }, [totalVotesList]);

  if (isComplete && totalVotesList.length === optionsList.length) {
    return (
      <div className="winner">
        <p> Total Votes: </p>
        {totalVotesList.map((vote, i) => {
          return (
            <p>
              Total votes for {optionsList[i]} is {vote}
            </p>
          );
        })}
        {winnerName ? (
          <p>
            Winner is {winnerName} with {winnerVotes} votes.
          </p>
        ) : (
          <p> Waiting for winner</p>
        )}
      </div>
    );
  }
}
