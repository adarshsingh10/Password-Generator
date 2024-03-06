import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Password from './password.js';

function App() {
  return (
    <Router>
      <div className="App" >
        <Routes>
          <Route path="/" element={<Password />} />
          <Route path="/passwordgenerator" element={<Password />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
