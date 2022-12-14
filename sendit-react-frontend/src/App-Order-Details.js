import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";

import "./App.css";


function AppOrderDetails(props){
   useEffect(()=>{
      getorderDetails();
   });

   const username = localStorage.getItem("username");

  const token = localStorage.getItem("token");
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
 // const url = "http://localhost:3000";
   const [order, setOrder]= useState({});

   const getorderDetails=()=>{
    fetch(`/get-an-order/${props.match.params.id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=> res.json())
    .then(res=>{

        if(res.message.message ==="jwt expired"){
            localStorage.clear();
            props.history.push("/admin");
        }

        if(res.message=== "Order found successfully"){
            setOrder(res.order);
        }
        
    })
    .catch(err=>{
        console.log("Error", err);
    });
   };

   const signOut=()=>{
       localStorage.clear();
       props.history.push("/");
   };

   if(!isAdminLoggedIn){
    return <Redirect to="/admin"/>
}

    return(
       <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/admin-profile">Profile</Link></li>
                    <li><Link to="#">Create Order</Link></li>
                    <li><Link to="/all-app-orders">Get Orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
            
            <div className="main-body">
                <header>
                    <h1> Hello Admin <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                    <h3>Here are the details of the order.</h3>
                    
                        <div className="orders order-details">  
                            <p className="order">Order details;</p>
                            
                            <div className="order-info">

                                <label>Weight(Kg): </label><span className="weight">{order.weight} </span><br></br>

                                <label>Price(#): </label><span className="price">{order.price} </span><br></br>

                                <label>Pick-Up Location: </label><span className="pick-location">{order.location}</span><br></br>

                                <label>Destination: </label><span className="destination">{order.destination}</span><br></br>

                                <label>Recipient Mobile: </label><span className="mobile">{order.recmobile}</span><br></br>

                                <label>Date of creation: </label><span className="date">{order.date}</span>
                            </div>
                            
                    </div>

                    
                </div>
            </div>
       
       </div>
    );
}

export default AppOrderDetails;
