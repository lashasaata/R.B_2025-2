import "./App.css";
import Header from "./components/header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <main>
      <Router>
        <Header />
        <Routes>
          <Route path="/" />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Registration />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
