"use client"
import { useState } from "react";
import RestaurantLogin from "../_components/auth/restaurantLogin";
import RestaurantSignUp from "../_components/auth/restaurantSignUp";


const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
     
      <div>
        {
        login? ( <RestaurantLogin setLogin={setLogin} /> ) : (
            <RestaurantSignUp setLogin={setLogin} /> 
        )
        }
      </div>
    </>
  );
};

export default Restaurant;
