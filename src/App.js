import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './Loginpage';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Registerpage from './Registerpage';
import ProductDetailPage from './Productdetail';
import CategoryDetail from './Categorydetail';
import Shoppingcart from './Shoppingcart';
import { AuthProvider } from './components/AuthContext';

import './App.css';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Registerpage />} />
        <Route path="/shoppingcart" element={<Shoppingcart />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
