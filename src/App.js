import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
//import Category from './components/Category'; // Assuming you have a Category component

function App() {  
  return (  
    <>  
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />  
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
      
      </Routes>  
    </>  
  );  
}  

export default App;
