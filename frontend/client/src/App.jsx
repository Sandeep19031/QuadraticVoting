import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import "./App.css";
import AdminOrVoter from "./AdminOrVoter";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from "react-toastify/dist/react-toastify"

function App() {

  return (
    <EthProvider>
      <div id="App">
        <div className="container">
         <ToastContainer />
         <AdminOrVoter/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
