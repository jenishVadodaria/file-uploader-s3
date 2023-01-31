import Layout from './components/layout/Layout';
import { BrowserRouter } from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );

}

export default App;
