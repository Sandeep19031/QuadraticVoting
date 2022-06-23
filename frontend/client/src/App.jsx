import { EthProvider } from "./contexts/EthContext";
import QV from "./components/qV/QV.js";
import Demo from "./components/Demo";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
         
          <Demo />
          <hr />
          <QV />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
