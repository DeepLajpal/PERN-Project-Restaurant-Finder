import { useState, createContext, useContext } from "react";
import StartRating from "../components/StartRating";

const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const RenderStarRatingComponent = (restaurant) => {
    if (!restaurant?.total_rating) {
      return <span className="ml-1">0 reviews</span>;
    }
    return (
      <>
        <StartRating rating={restaurant?.avg_rating} />
        <span className="ml-1">({restaurant?.total_rating})</span>
      </>
    );
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
        currentReviews,
        setCurrentReviews,
        RenderStarRatingComponent,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};

const useRestaurantsContext = () => {
  return useContext(RestaurantsContext);
};

export {
  RestaurantsContextProvider,
  RestaurantsContext,
  useRestaurantsContext,
};
