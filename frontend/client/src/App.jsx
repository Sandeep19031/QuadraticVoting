import { EthProvider } from "./contexts/EthContext";
import QV from "./components/qV/QV.js";
import Demo from "./components/Demo";
import "./App.css";
import LoadCastVote from "./components/qV/LoadCastVote";
import AdminOrVoter from "./AdminOrVoter";
import CreateProposal from "./components/qV/CreateProposal.js";
import CastVote from "./components/qV/CastVote";

function App() {

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <CreateProposal />
          <hr />
          <CastVote />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
