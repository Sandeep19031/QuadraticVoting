import React from "react";
import "./App.css";
import { useState } from "react";
import Countdown from "react-countdown";

export default function App() {
  const [candA, setCandA] = useState();
  const [candB, setCandB] = useState();
  const [candC, setCandC] = useState();
  const [candD, setCandD] = useState();
  const [candE, setCandE] = useState();
  const [winner, setWinner] = useState();
  const [d, setD] = useState(Date.now());

  const [formCompletion, setStatus] = useState("Form will close in:");

  const [button, setBut] = useState(false);

  // const [liveTime, setTime] = useState();
  const Completed = () => {
    setStatus("Form has been closed");
    setBut(true);
    setWinner(Math.max(votesA, votesB, votesC, votesD, votesE));
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
  };
  const [votesA, setVotesA] = useState(Number(0));
  const [votesB, setVotesB] = useState(Number(0));
  const [votesC, setVotesC] = useState(Number(0));
  const [votesD, setVotesD] = useState(Number(0));
  const [votesE, setVotesE] = useState(Number(0));

  // let votes = {
  //   A: 0,
  //   B: 0,
  //   C: 0,
  //   D: 0,
  //   E: 0
  // };
  const inputCreditA = (event) => {
    setCandA(Number(event.target.value));
  };
  const inputCreditB = (event) => {
    setCandB(Number(event.target.value));
  };
  const inputCreditC = (event) => {
    setCandC(Number(event.target.value));
  };
  const inputCreditD = (event) => {
    setCandD(Number(event.target.value));
  };
  const inputCreditE = (event) => {
    setCandE(Number(event.target.value));
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
      setVotesA(votesA + Math.sqrt(candA));
      setVotesB(votesB + Math.sqrt(candB));
      setVotesC(votesC + Math.sqrt(candC));
      setVotesD(votesD + Math.sqrt(candD));
      setVotesE(votesE + Math.sqrt(candE));
    }
    event.preventDefault();
  };
  return (
    <div className="App">
      <h1> Quadratic Voting </h1>
      <h4> Total Credits 20</h4>
      <h5> Please give credits to the following candidates:-</h5>
      <form onSubmit={checkQv}>
        <label>
          {" "}
          Candidate A:
          <input
            type="number"
            min="0"
            max="20"
            placeholder="creditA"
            name="Voter"
            value={candA}
            onChange={inputCreditA}
          />
        </label>
        <br />
        <label>
          {" "}
          Candidate B:
          <input
            type="number"
            min="0"
            max="20"
            placeholder="creditB"
            name="Voter"
            value={candB}
            onChange={inputCreditB}
          />
        </label>
        <br />
        <label>
          {" "}
          Candidate C:
          <input
            type="number"
            min="0"
            max="20"
            placeholder="creditC"
            name="Voter"
            value={candC}
            onChange={inputCreditC}
          />
        </label>
        <br />
        <label>
          {" "}
          Candidate D:
          <input
            type="number"
            min="0"
            max="20"
            placeholder="creditD"
            name="Voter"
            value={candD}
            onChange={inputCreditD}
          />
        </label>
        <br />
        <label>
          {" "}
          Candidate E:
          <input
            type="number"
            min="0"
            max="20"
            placeholder="creditE"
            name="Voter"
            value={candE}
            onChange={inputCreditE}
          />
        </label>
        <br />
        <input type="submit" value="Submit" disabled={button} />
      </form>
      <h3>{formCompletion}</h3>
      <div>
        <Countdown date={d + 1000 * 60 * 60 * 18}>
          <Completed />
        </Countdown>
      </div>
    </div>
  );
}