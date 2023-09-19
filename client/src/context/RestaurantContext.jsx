import { useState, createContext, useContext } from "react";
const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
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
