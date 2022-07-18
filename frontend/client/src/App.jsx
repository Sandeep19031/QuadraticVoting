import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import "./App.css";
import AdminOrVoter from "./AdminOrVoter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CastVote from "./components/qV/CastVote";
import VoterPage from "./VoterPage";
import AdminPage from "./AdminPage";



function App() {

  return (
    <Router>
      <EthProvider>
      
        <div id="App">
          <div className="container">
          <Routes>           
            <Route path="/castVote/:id" element={<CastVote />} />
            <Route path="/" element={<AdminOrVoter />} />
          </Routes>
          </div>
          
        </div>
      
      </EthProvider>
    </Router>
  );
}

export default App;
