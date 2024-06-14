import logo from './logo.svg';
import './App.css';
import Home from './components/homeComponent/home'
import Signup from './components/loginComponent/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/logiinComponent/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
