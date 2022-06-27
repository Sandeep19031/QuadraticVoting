import React from "react";
import CreateProposal from "./components/qV/CreateProposal";
import LoadCastVote from "./components/qV/LoadCastVote";

export default function AdminPage() {
  return (
    <div>
      <CreateProposal />
      <LoadCastVote />
    </div>
  );
}
