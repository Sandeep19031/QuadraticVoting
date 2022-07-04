import React, { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import { useEth } from "./contexts/EthContext";
import VoterPage from "./VoterPage";
import { toast } from "react-toastify/dist/react-toastify";
export default function AdminOrVoter() {
  const [isAdmin, setIsAdmin] = useState();
  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    const fethAdminInfo = async () => {
      try {
        const res = await contract?.methods
          .checkAdmin()
          .call({ from: accounts[0] });

        console.log("checkAdmin fucntion", res);

        setIsAdmin(res);
      } catch (err) {
        console.log("error in fetch admin", err);
        toast.error("Error in Login!");
      }
    };

    fethAdminInfo();

    if (isAdmin) {
      return toast.success("Successfully Login as Admin.");
    }
  });

  if (isAdmin) {
    return <AdminPage />;
  } else {
    return <VoterPage />;
  }
}
