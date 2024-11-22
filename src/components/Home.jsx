import React from "react";  
//import { Navbar, Nav } from 'react-bootstrap'; // Correct import  
import Products from './Products';

const Home = () => {  
    return (  
        <div className="hero">  
              
            <div className="card text-bg-dark text-white border-0">  
                <img src="/assets/chg.webp" className="card-img" height="250" alt="..." />  
                <div className="card-img-overlay d-flexs flex-column justify-content-center">  
                  <div className="container">
                  <h1 className="card-title display-3 fw-bolder mb-8">NEW SEASON ARRIVALS</h1>  
                    <p className="card-text">  
                        CHECK OUT THE LATEST TRENDS.  
                    </p>  
                    
                  </div>
                    <p className="card-text lead fd-2">  
    
                    </p>  
                </div>  
            </div>  
            <Products/>
        </div>  
    );  
}  

export default Home;