import React, { useEffect, useReducer, useState } from "react";
import "./CreateProposal.css";
import useEth from "../../contexts/EthContext/useEth";
import {
  reducer,
  actions,
  initialState,
} from "../../contexts/EthContext/state";

export default function CreateProposal() {
  const [description, setDescription] = useState();
  const [expTime, setExpTime] = useState(0);
  const [optionsList, setOptionsList] = useState(
    Array.from(new Array(4)).map((_) => "")
  );
  const {
    state: { contract, accounts },
    dispatch,
  } = useEth();

  useEffect(() => {});
  const handleCreateButton = async () => {
    try {
      console.log("option list", optionsList);
      const res = await contract.methods
        .createProposal(description, optionsList, expTime)
        .send({ from: accounts[0] });

      console.log("res proposal id", res);

      // const proposalID = res.events.ProposalCreated.returnValues.ProposalID;
      // dispatch({
      //   type: actions.createProposal,
      //   data: { proposalID: proposalID },
      // });
      // dispatch({
      //   type: actions.setDescription,
      //   data: { description: description },
      // });
    } catch (err) {
      console.log("error", err);
    }
  };

  const numberVariable = 4;
  let arr = [];
  for (let i = 0; i < numberVariable; i++) {
    arr.push(i);
  }
  let initialState = {};

  arr.forEach((element) => {
    initialState[element] = "";
  });

  const [input, setInput] = useState(initialState);
  let inputName = 0;

  const handleUserInputChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setInput({ [name]: newValue });
    let newOptionsList = optionsList;
    newOptionsList[name - 1] = newValue;
    setOptionsList(newOptionsList);
  };

  const OptionInput = arr.map((number) => {
    inputName++;
    return (
      <div className="options" key={number + 1}>
        <div className="option-title">
          <p>Option {number + 1} </p>
        </div>
        <div className="option-inputBox">
          <input
            type="text"
            className="option-input"
            placeholder="option"
            value={input[inputName]}
            name={inputName}
            onChange={handleUserInputChange}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="createPurposal">
      <div className="title">
        <h2>Proposal for voting</h2>
        <br />
      </div>

      <div className="description">
        <div className="description-title">
          <p>Description: </p>
        </div>
        <div className="description-inputBox">
          <input
            type="textarea"
            className="description-input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {OptionInput}

      <div className="expirationTime">
        <div className="expirationTime-title">
          <p>expirationTime: </p>
        </div>
        <div className="expirationTime-inputBox">
          <input
            type="number"
            className="expirationTime-input"
            placeholder="Expiration Time"
            value={expTime}
            onChange={(e) => setExpTime(e.target.value)}
          />
        </div>
      </div>

      <div className="button-container">
        <div className="createButton" onClick={handleCreateButton}>
          <p>CREATE</p>
        </div>
      </div>
    </div>
  );
}
