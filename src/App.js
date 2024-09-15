import './App.css';
import Addtodo from './components/Addtodo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HistoryPage from './components/HistoryPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Addtodo />} />
          <Route path="/historyPage" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
