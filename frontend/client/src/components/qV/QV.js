import React from "react";
import "./QV.css";
import { useState } from "react";
import Countdown from "react-countdown";


export default function QV() {
  const [candA, setCandA] = useState(Number(0));
  const [prevA, setPrevA] = useState(Number(0));
  const [backA, setBackA] = useState(false);

  const [candB, setCandB] = useState(Number(0));
  const [prevB, setPrevB] = useState(Number(0));
  const [backB, setBackB] = useState(false);

  const [candC, setCandC] = useState(Number(0));
  const [prevC, setPrevC] = useState(Number(0));
  const [backC, setBackC] = useState(false);

  const [candD, setCandD] = useState(Number(0));
  const [prevD, setPrevD] = useState(Number(0));
  const [backD, setBackD] = useState(false);

  const [candE, setCandE] = useState(Number(0));
  const [prevE, setPrevE] = useState(Number(0));
  const [backE, setBackE] = useState(false);

  const [totalCand1Vote, setTotalCand1Vote] = useState(0);
  const [totalCand2Vote, setTotalCand2Vote] = useState(0);
  const [totalCand3Vote, setTotalCand3Vote] = useState(0);
  const [totalCand4Vote, setTotalCand4Vote] = useState(0);
  const [totalCand5Vote, setTotalCand5Vote] = useState(0);

  const [winner, setWinner] = useState();
  const [d, setD] = useState(Date.now());

  const [formCompletion, setStatus] = useState("Form will close in:");

  const [button, setBut] = useState(false);

  const [userId, setUserId] = useState(null);
  // const [liveTime, setTime] = useState();


  const Winner = () => {
    setWinner(Math.max(votesA, votesB, votesC, votesD,votesE));
    console.log(winner);
    if (winner === votesA) {
      alert("Candidate A has won with " + winner + " votes.");
    } else if (winner === votesB) {
      alert("Candidate B has won with " + winner + " votes.");
    } else if (winner === votesC) {
      alert("Candidate C has won with " + winner + " votes.");
    } else if (winner === votesD) {
      alert("Candidate D has won with " + winner + " votes.");
    } else if (winner === votesE) {
      alert("Candidate E has won with " + winner + " votes.");
    }
  }
  const Completed = () => {
    setStatus("Form has been closed. Wait for the results");
    setBut(true);
    Winner();
    
  };

  // Calculation of votes of all candidates - Qvoting
  const [votesA, setVotesA] = useState(Number(0));
  const [votesB, setVotesB] = useState(Number(0));
  const [votesC, setVotesC] = useState(Number(0));
  const [votesD, setVotesD] = useState(Number(0));
  const [votesE, setVotesE] = useState(Number(0));
  const [RemainingCredits, setReaminingCredits] = useState(Number(20));
  const [totalCredit, setTotalCredit] = useState(Number(20));

  const inputCreditA = (e) => {
    var tar = Number(e.target.value);
    if (tar === 0 && backA === true) {
      setReaminingCredits(Number(RemainingCredits) + Number(prevA));
      setBackA(false);
    } else if (RemainingCredits - tar ** 2 >= 0) {
      setCandA(tar);
      setBackA(true);
      setReaminingCredits(Number(RemainingCredits) - tar ** 2);
      setPrevA(tar ** 2);
    } else {
      setCandA(0);
      alert(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
  };
  const inputCreditB = (e) => {
    var tar = Number(e.target.value);
    if (tar === 0 && backB === true) {
      setReaminingCredits(Number(RemainingCredits) + Number(prevB));
      setBackB(false);
    } else if (RemainingCredits - tar ** 2 >= 0) {
      setCandB(tar);
      setBackB(true);
      setReaminingCredits(Number(RemainingCredits) - tar ** 2);
      setPrevB(tar ** 2);
    } else {
      setCandB(0);
      alert(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
  };
  const inputCreditC = (e) => {
    var tar = Number(e.target.value);
    if (tar === 0 && backC === true) {
      setReaminingCredits(Number(RemainingCredits) + Number(prevC));
      setBackC(false);
    } else if (RemainingCredits - tar ** 2 >= 0) {
      setCandC(tar);
      setBackC(true);
      setReaminingCredits(Number(RemainingCredits) - tar ** 2);
      setPrevC(tar ** 2);
    } else {
      setCandC(0);
      alert(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
  };
  const inputCreditD = (e) => {
    var tar = Number(e.target.value);
    if (tar === 0 && backD === true) {
      setReaminingCredits(Number(RemainingCredits) + Number(prevD));
      setBackD(false);
    } else if (RemainingCredits - tar ** 2 >= 0) {
      setCandD(tar);
      setBackD(true);
      setReaminingCredits(Number(RemainingCredits) - tar ** 2);
      setPrevD(tar ** 2);
    } else {
      setCandD(0);
      alert(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
  };
  const inputCreditE = (e) => {
    var tar = Number(e.target.value);
    if (tar === 0 && backE === true) {
      setReaminingCredits(Number(RemainingCredits) + Number(prevE));
      setBackE(false);
    } else if (RemainingCredits - tar ** 2 >= 0) {
      setCandE(tar);
      setBackE(true);
      setReaminingCredits(Number(RemainingCredits) - tar ** 2);
      setPrevE(tar ** 2);
    } else {
      setCandE(0);
      alert(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
  };

  const checkQv = (event) => {

    

    alert("Submitted!");
    setCandA(Number(0));
    setCandB(Number(0));
    setCandC(Number(0));
    setCandD(Number(0));
    setCandE(Number(0));
    var total = candA + candB + candC + candD + candE;
    if (total > 20) {
      alert("All credits sum exceeded the total credits, pls fill again!");
    } else {
      setVotesA(votesA + candA);
      setVotesB(votesB + candB);
      setVotesC(votesC + candC);
      setVotesD(votesD + candD);
      setVotesE(votesE + candE);
    }
    event.preventDefault();
  };
  return (
    <div className="App">
      <h1> Quadratic Voting </h1>

      <label>
          {" "}
          Enter User ID:
          <input
            type="number"
            placeholder="id"
            name="id"
            value={userId}
            onChange={(e) => setUserId(e.target.value) }
          />
      </label>

      <h4> Total Credits 20</h4>
      <h4> Remaining Credits {RemainingCredits}</h4>
      <h5> Please give credits to the following candidates:-</h5>
      <form onSubmit={checkQv}>
        <label>
          {" "}
          Candidate A:
          <input
            type="number"
            min="0"
            max={Math.sqrt(totalCredit)}
            placeholder="VotesA"
            name="Voter"
            value={candA}
            onChange={inputCreditA}
          />
          <span> Credits: {candA ** 2}</span>
        </label>
        <br />
        <label>
          {" "}
          Candidate B:
          <input
            type="number"
            min="0"
            max={Math.sqrt(totalCredit)}
            placeholder="VotesB"
            name="Voter"
            value={candB}
            onChange={inputCreditB}
          />
          <span> Credits: {candB ** 2}</span>
        </label>
        <br />
        <label>
          {" "}
          Candidate C:
          <input
            type="number"
            min="0"
            max={Math.sqrt(totalCredit)}
            placeholder="VotesC"
            name="Voter"
            value={candC}
            onChange={inputCreditC}
          />
          <span> Credits: {candC ** 2}</span>
        </label>
        <br />
        <label>
          {" "}
          Candidate D:
          <input
            type="number"
            min="0"
            max={Math.sqrt(totalCredit)}
            placeholder="VotesD"
            name="Voter"
            value={candD}
            onChange={inputCreditD}
          />
          <span> Credits: {candD ** 2}</span>
        </label>
        <br />
        <label>
          {" "}
          Candidate E:
          <input
            type="number"
            min="0"
            max={Math.sqrt(totalCredit)}
            placeholder="VotesE"
            name="Voter"
            value={candE}
            onChange={inputCreditE}
          />
          <span> Credits: {candE ** 2}</span>
        </label>
        <br />
        <input type="submit" value="Submit" disabled={button} />
      </form>
      <h3>{formCompletion}</h3>
      <div>
        <Countdown date={d + 30000}>
          <Completed />
        </Countdown>
      </div>
    </div>
  );
}
