import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StartRating from "../components/StartRating";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";



const RestaurantDetailPage = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantsContext();
  const { currentReviews, setCurrentReviews } = useRestaurantsContext();

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${params.id}`);
        if (response) {
          setSelectedRestaurant(() => response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentReviews]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">{selectedRestaurant.restaurant?.name}</h1>
          <h2>Add a Review</h2>
          <AddReviews />
          <div className="mt-3">
            <Reviews allReviews={selectedRestaurant.reviews} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
