import React, { useState } from "react";
import { useEth } from "../../contexts/EthContext";
import CastVote from "./CastVote";

export default function LoadCastVote() {
  const {
    state: { proposalID },
    dispatch,
  } = useEth();

  if (proposalID) {
    return <CastVote />;
  }
}
