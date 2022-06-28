import React, { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import { useEth } from "./contexts/EthContext";
import VoterPage from "./VoterPage";

export default function AdminOrVoter() {
  let res;
  const [isAdmin, setIsAdmin] = useState();
  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    const alreadyCheck = localStorage.getItem("isAdmin");
    if (alreadyCheck === "true") {
      setIsAdmin(true);
    } else {
      const fethAdminInfo = async () => {
        res = await contract.methods.checkAdmin().send({ from: accounts[0] });
        setIsAdmin(res.status);
        console.log("checkAdmin fucntion", res.status);
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      };

      fethAdminInfo();
    }
  }, []);

  if (isAdmin) {
    return <AdminPage />;
  } else {
    return <VoterPage />;
  }
}
