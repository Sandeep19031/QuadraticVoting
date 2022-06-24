import { EthProvider } from "./contexts/EthContext";
import QV from "./components/qV/QV.js";
import Demo from "./components/Demo";
import "./App.css";
import CreatePurposal from "./components/qV/createPurposal.js";
import CastVote from "./components/qV/CastVote";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <hr />
          <CreatePurposal />
          <hr />
          <CastVote />
          <hr />
          <QV />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
