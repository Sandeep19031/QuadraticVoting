import { EthProvider } from "./contexts/EthContext";
import QV from "./components/qV/QV.js";
import Demo from "./components/Demo";
import "./App.css";
import CreatePurposal from "./components/qV/CreatePurposal.js";
import LoadCastVote from "./components/qV/LoadCastVote";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <hr />
          <CreatePurposal />
          <hr />
          <LoadCastVote />
          <QV />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
