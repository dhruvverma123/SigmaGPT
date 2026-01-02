import "./App.css";
import ContextApi from "./ContextApi.jsx";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";

function App() {
  return (
    <div className="app">
      <ContextApi>
        <Sidebar />
        <ChatWindow />
      </ContextApi>
    </div>
  );
}

export default App;
