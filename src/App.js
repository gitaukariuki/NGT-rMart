import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
//import CartButton from './components/CartButton';
import About from './components/About';  // Importing the AboutUs component
import Contacts from './components/Contacts';  // Importing the Contacts component
import Login from './components/Login';  // Importing the Login component
import Register from './components/Register';  // Importing the Register component

function App() {  
  return (  
    <>  
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />  
        <Route path="/products" exact element={<Products />} />
        <Route path="/products/:id" exact element={<Product />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/about" exact element={<About />} />  {/* About Us Route */}
        <Route path="/contacts" exact element={<Contacts />} />  {/* Contacts Route */}
        <Route path="/login" exact element={<Login />} />  {/* Login Route */}
        <Route path="/register" exact element={<Register />} />  {/* Register Route */}
      </Routes>  
    </>  
  );  
}  

export default App;
