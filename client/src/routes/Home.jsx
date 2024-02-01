import React from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import NavBar from "../components/NavBar";
import RenderPopup from "../components/RenderPopup";

const Home = () => {
  return (
    <div>
      <RenderPopup/>
      <Header />
      <NavBar/>
      <RestaurantList />
    </div>
  );
};

export default Home;
