import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const RestaurantDetailPage = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantsContext();

  const params = useParams();
  console.log(params);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("fetch called")
  //     try {
  //       console.log("inside trycatch start")
  //       const response = await RestaurantFinder.get(`/${params.id}`);
  //       setSelectedRestaurant(response?.data.data.restaurant[0]);
  //       console.log(response?.data.data.restaurant[0]);
  //       console.log("inside trycatch end")
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div>
      <h1>HEloo</h1>
    </div>
  );
};

export default RestaurantDetailPage;
