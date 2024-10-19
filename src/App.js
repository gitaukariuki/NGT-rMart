import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import CartButton from './components/CartButton';
import About from './components/About';  // Importing the AboutUs component
import Contacts from './components/Contacts';  // Importing the Contacts component
import Login from './components/Login';  // Importing the Login component
import Register from './components/Register';  // Importing the Register component

function App() {  
  return (  
    <>  
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />  
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/about" element={<About />} />  {/* About Us Route */}
        <Route exact path="/contacts" element={<Contacts />} />  {/* Contacts Route */}
        <Route exact path="/login" element={<Login />} />  {/* Login Route */}
        <Route exact path="/register" element={<Register />} />  {/* Register Route */}
      </Routes>  
    </>  
  );  
}  

export default App;
