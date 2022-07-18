import React, { useEffect } from "react";
import CreateProposal from "./components/qV/CreateProposal";
import Mint from "./components/qV/Mint";
import ProposalList from "./components/qV/ProposalList";
import toast from "cogo-toast";

export default function AdminPage() {
  return (
    <div>
      <CreateProposal />
      <hr />
      <Mint />
      <hr />
      <ProposalList />
    </div>
  );
}
