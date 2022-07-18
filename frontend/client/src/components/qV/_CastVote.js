import React, { useState } from "react";
import "./CastVote.css";
import useEth from "../../contexts/EthContext/useEth";
import toast from "react-hot-toast";
import Countdown, { zeroPad } from "react-countdown";
import Winner from "./Winner";

export default function CastVote() {
  const [proposalID, setProposalID] = useState(0);
  const [description, setDescription] = useState();
  const [noOfOptions, setNoOfOptions] = useState();
  const [optionsList, setOptionsList] = useState([]);
  const [expTime, setExpTime] = useState();
  const [proposalStatus, setProposalStatus] = useState();

  const {
    state: { contract, accounts },
  } = useEth();

  const [remainingCredits, setRemainingCredits] = useState();
  const [totalCredits, setTotalCredits] = useState();
  const [subQuantity, setSubQuantity] = useState(Number(0));
  const [isComplete, setIsComplete] = useState(false);

  const [votesBoolList, setVotesBoolList] = useState(
    Array.from(new Array(noOfOptions)).map((_) => "")
  );
  const [votesList, setVotesList] = useState(
    Array.from(new Array(noOfOptions))
  );

  async function handleProposalIDSubmitButton() {
    try {
      const res = await contract.methods
        .getDetails(proposalID)
        .call({ from: accounts[0] });
      console.log("getDetails()", res);
      setDescription(res[0]);
      setOptionsList(res[1]);
      setNoOfOptions(res[1].length);

      const getExpTime = await contract.methods
        .getProposalExpirationTime(proposalID)
        .call();
      setExpTime(getExpTime);
      console.log("exp time", getExpTime);

      const getProposalStatus = await contract.methods
        .getProposalStatus(proposalID)
        .call();
      setProposalStatus(getProposalStatus);
      console.log("proposal status", getProposalStatus);

      const credits = await contract.methods.balanceOf(accounts[0]).call();
      console.log("res from balanceOf", credits);
      setRemainingCredits(Number(credits));
      setTotalCredits(credits);
    } catch (err) {
      console.log("error in fetching proposal!");
    }
  }
  const handleCasteButton = async () => {
    console.log("votesBoolList", votesBoolList);
    console.log("votesList", votesList);
    if (
      votesList.length !== noOfOptions ||
      votesBoolList.length !== noOfOptions
    ) {
      return;
    }
    try {
      const res = await contract.methods
        .castVote(proposalID, votesList)
        .send({ from: accounts[0] });

      console.log("res from castVote", res);
      if (res) {
        toast.success("Your votes are successfully casted ...");
      }
    } catch (err) {
      //toast.err("Error in Vote Casting !!");
      console.log("Proposal has expired");
      toast.error("Proposal has expired");
    }
  };

  let arr = [];
  for (let i = 0; i < noOfOptions; i++) {
    arr.push(i + 1);
  }
  let initialStateYes = {};
  let initialStateNo = {};
  let initialVotesBoolObject = {};
  arr.forEach((element) => {
    initialStateYes[element] = "";
    initialStateNo[element] = "";
    initialVotesBoolObject = "";
  });
  const [inputYes, setInputYes] = useState(initialStateYes);
  const [inputNo, setInputNo] = useState(initialStateNo);
  const [inputVotesBool, setInputVotesBoolObject] = useState(
    initialVotesBoolObject
  );
  let inputName = 0;

  const handleRadioButton = (e, index) => {
    let name = e.target.name;
    let newValue = e.target.value;

    votesBoolList[index] = newValue;
    votesList[index] = 0;
    setInputVotesBoolObject({ [index]: newValue });
    setVotesBoolList(votesBoolList);
    setVotesList(votesList);
  };

  const handleVoteInput = (e, index) => {
    let name = e.target.name;
    let newValue = e.target.value;
    let sQ = newValue * newValue;

    let rc = remainingCredits + subQuantity - sQ;
    console.log(
      "subQuantity",
      subQuantity,
      "sQ",
      sQ,
      "remaing credit",
      remainingCredits
    );
    if (rc < 0) {
      return toast.error(
        "You have exceeded the remaining credits, please reduce the number of votes"
      );
    }
    if (votesBoolList[index] == "Yes") {
      votesList[index] = Number(newValue);
      setInputYes({ [name]: newValue });
    } else if (votesBoolList[index] == "No") {
      votesBoolList[index] = 0;
      setInputNo({ [name]: 0 });
    }

    setVotesList(votesList);
    setRemainingCredits(rc);
    setSubQuantity(sQ);
  };

  const VoteContainer = ({ key, index, optionName }) => {
    return (
      <div className="voteContainer" key={key}>
        <div className="descriptionContainer">
          <h3>{optionName}</h3>
        </div>

        <div className="voteToCandidate">
          <div className="radioClass">
            <label>
              <input
                type="radio"
                value="Yes"
                name={optionName}
                checked={votesBoolList[index] === "Yes"}
                onChange={(e) => handleRadioButton(e, index)}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="No"
                name={optionName}
                checked={votesBoolList[index] === "No"}
                onChange={(e) => handleRadioButton(e, index)}
              />{" "}
              No
            </label>
          </div>
          {votesBoolList[index] === "Yes" && (
            <div className="voteInputBoxYes" id={index}>
              <input
                type="number"
                value={votesList[index]}
                placeholder="Vote"
                min={0}
                name={index}
                onFocus={(e) => setSubQuantity(e.target.value * e.target.value)}
                onChange={(e) => {
                  return handleVoteInput(e, index);
                }}
              />
            </div>
          )}
          {votesBoolList[index] == "No" && (
            <div className="voteInputBoxNo" id={index}>
              <input
                type="number"
                value={0}
                placeholder="0"
                min={0}
                name={index}
                onChange={(e) => {
                  //return handleVoteInput(e, index);
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const VoteContainerList = arr.map((number) => {
    let index = number - 1;
    let optionName = optionsList[index];
    return VoteContainer({ key: number, index: index, optionName: optionName });
  });

  const CastVoteContainer = () => {
    return (
      <div className="castVote" id={proposalID}>
        <br />
        <div className="proposalInfo">
          <h2>{description}</h2>
        </div>
        {VoteContainerList}
        <div className="button-container">
          <div className="castButton" onClick={handleCasteButton}>
            <p>CAST</p>
          </div>
        </div>
      </div>
    );
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setIsComplete(true);
      return;
    } else {
      // Render a countdown
      return (
        <span>
          Timme-Left {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return (
    <div>
      <div className="proposaIDInput">
        <div>
          <p>Enter ProposalID</p>
        </div>
        <div className="proposalIDInputBox">
          <div className="wrapper">
            <input
              type="number"
              name="proposalIDInput-input"
              className="proposalID-input"
              value={proposalID}
              onChange={(e) => setProposalID(e.target.value)}
            />
          </div>
        </div>
        <div className="proposalIDButton-container">
          <div
            className="proposalIDSubmitButton"
            onClick={handleProposalIDSubmitButton}
          >
            <p>SUBMIT</p>
          </div>
        </div>
      </div>

      <div className="proposalStatus">
        <p>Proposal Status: {proposalStatus}</p>
      </div>
      <div className="creditsLeft">
        <p>Remaining credits: {remainingCredits}</p>
      </div>

      {expTime ? (
        <Countdown date={expTime * 1000} renderer={renderer} />
      ) : (
        <></>
      )}

      {proposalID && description ? CastVoteContainer() : <></>}

      {isComplete && (
        <Winner proposaID={proposalID} optionsList={optionsList} />
      )}
    </div>
  );
}
