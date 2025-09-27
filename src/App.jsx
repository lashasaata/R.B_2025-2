import "./App.css";
import Header from "./components/header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <main>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
