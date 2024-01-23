import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantsContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StartRating from "../components/StartRating";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";

const RestaurantDetailPage = () => {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    RenderStarRatingComponent,
  } = useRestaurantsContext();
  const { currentReviews, setCurrentReviews } = useRestaurantsContext();

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${params.id}`);
        if (response) {
          setSelectedRestaurant(() => response.data.data);
          console.log("selectedRestaurant: ", selectedRestaurant )
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
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant?.name}
          </h1>
          <div className="text-center text-warning fs-4">
            {RenderStarRatingComponent(selectedRestaurant.restaurant)}
          </div>
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
