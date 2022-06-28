import React from "react";
import CastVote from "./components/qV/CastVote";
import CreateProposal from "./components/qV/CreateProposal";
import LoadCastVote from "./components/qV/LoadCastVote";

export default function AdminPage() {
  return (
    <div>
      <CreateProposal />
      <hr />
      <CastVote />
    </div>
  );
}
