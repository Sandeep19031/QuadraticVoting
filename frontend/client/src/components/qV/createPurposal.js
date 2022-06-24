import React, { useEffect, useReducer, useState } from "react";
import "./CreatePurposal.css";
import useEth from "../../contexts/EthContext/useEth";
import {
  reducer,
  actions,
  initialState,
} from "../../contexts/EthContext/state";

export default function CreatePurposal() {
  const [description, setDescription] = useState();
  const [expTime, setExpTime] = useState(0);

  const {
    state: { contract, accounts },
    dispatch,
  } = useEth();

  const handleCreateButton = async () => {
    try {
      const res = await contract.methods
        .createProposal(description, expTime)
        .send({ from: accounts[0] });

      console.log(
        "res proposal id",
        res.events.ProposalCreated.returnValues.ProposalID
      );

      const proposalID = res.events.ProposalCreated.returnValues.ProposalID;
      dispatch({
        type: actions.createProposal,
        data: { proposalID: proposalID },
      });
      dispatch({
        type: actions.setDescription,
        data: { description: description },
      });
    } catch (err) {
      console.log("error", err);
    }
  };
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
