import { useState, createContext, useContext } from "react";
import StartRating from "../components/StartRating";
import RestaurantFinder from "../apis/RestaurantFinder";
// import { useNavigate } from "react-router-dom";

// Create a Context for Restaurants
const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  // State for managing restaurant data
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});
  const [popups, setPopups] = useState([]);
  const [modalCloseBtnFunction, setModalCloseBtnFunction] = useState();
  
  // State for managing form inputs for adding/updating restaurants
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedPriceRange, setUpdatedPriceRange] = useState("Price Range");
  
  // State for modal visibility and search results
  const [modalDisplay, setModalDisplay] = useState(true);
  const [searchRestaurants, setSearchRestaurants] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Handles form submission for adding a new restaurant
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name && location && priceRange !== "Price Range") {
        // Check if the restaurant already exists
        const exists = restaurants?.some(
          (restaurant) =>
            restaurant.name === name &&
            restaurant.location === location &&
            restaurant.price_range === priceRange
        );

        if (exists) {
          // Show popup if restaurant already exists
          setModalDisplay(() => true);
          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Already Exist!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);
        } else {
          // Add new restaurant
          const response = await RestaurantFinder.post("/", {
            name,
            location,
            price_range: priceRange,
          });

          addRestaurant(response.data.data.restaurant);
          setModalDisplay(() => false);
          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Adding Success!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);

          // Reset form inputs
          setName("");
          setLocation("");
          setPriceRange("Price Range");
        }
      } else {
        // Show popup if any form details are missing
        setModalDisplay(true);
        setPopups((prevPopups) => [
          ...prevPopups,
          "All Details are Mandatory!",
        ]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Adds a new restaurant to the list
  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => [...prevRestaurants, restaurant]);
  };

  // Renders star rating component based on restaurant rating
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

  // Handles deletion of a restaurant
  const handleDeleteBtn = async (e, id, restaurant) => {
    e.stopPropagation();
    if (
      restaurant?.total_rating === 0 ||
      restaurant?.total_rating === undefined ||
      restaurant?.total_rating === null
    ) {
      try {
        await RestaurantFinder.delete(`./${id}`);

        // Update the state to remove the deleted restaurant
        setRestaurants((prevRestaurants) => {
          return prevRestaurants.filter((restaurant) => restaurant.id !== id);
        });
        setSearchRestaurants((preSearchRestaurants) =>
          preSearchRestaurants?.filter(
            (currentRestaurant) => currentRestaurant?.id !== restaurant?.id
          )
        );
        setPopups((prevPopups) => [...prevPopups, "Delete Success!"]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
        setModalDisplay(() => false);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Show popup if restaurant has reviews
      setModalDisplay(() => true);
      setPopups((prevPopups) => [...prevPopups, "Reviews Exist!"]);
      setTimeout(() => {
        setPopups((prevPopups) => prevPopups.slice(1));
      }, 1500);
    }
  };

  // Handles updating a restaurant
  const handleUpdate = async (e, id, restaurant) => {
    e.preventDefault();
    try {
      if (
        updatedName &&
        updatedLocation &&
        updatedPriceRange !== "Price Range"
      ) {
        const exists = restaurants?.some(
          (restaurant) =>
            restaurant?.name === updatedName &&
            restaurant?.location === updatedLocation &&
            restaurant?.price_range === updatedPriceRange
        );
        if (exists) {
          // Show popup if restaurant already exists
          setModalDisplay(() => true);
          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Already Exist!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);
        } else {
          try {
            // Update restaurant details
            const response = await RestaurantFinder.put(`/${restaurant.id}`, {
              name: updatedName,
              location: updatedLocation,
              price_range: updatedPriceRange,
            });

            // Refresh restaurants list
            try {
              const response = await RestaurantFinder.get("/");
              setRestaurants(response.data.data.restaurant);
            } catch (error) {
              console.log(error);
            }

            setRestaurants((prevRestaurants) => {
              setSearchRestaurants((preSearchRestaurants) => {
                return prevRestaurants?.filter((restaurant) => {
                  const Result = preSearchRestaurants?.map(
                    (currentRestaurant) => {
                      const idMatch = currentRestaurant?.id === restaurant?.id;
                      return idMatch;
                    }
                  );

                  return Result?.includes(true);
                });
              });
              return prevRestaurants;
            });

            setModalDisplay(() => false);
            setPopups((prevPopups) => [...prevPopups, "Update Successfully"]);
            setTimeout(() => {
              setPopups((prevPopups) => prevPopups.slice(1));
            }, 1500);

            // Reset update form inputs
            setUpdatedName("");
            setUpdatedLocation("");
            setUpdatedPriceRange("Price Range");
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        // Show popup if any form details are missing
        setModalDisplay(true);
        setPopups((prevPopups) => [
          ...prevPopups,
          "All Details are Mandatory!",
        ]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RestaurantsContext.Provider
      value={{
        inputValue,
        setInputValue,
        searchRestaurants,
        setSearchRestaurants,
        handleUpdate,
        updatedName,
        setUpdatedName,
        updatedLocation,
        setUpdatedLocation,
        updatedPriceRange,
        setUpdatedPriceRange,
        handleDeleteBtn,
        handleOnSubmit,
        name,
        setName,
        location,
        setLocation,
        priceRange,
        setPriceRange,
        modalCloseBtnFunction,
        setModalCloseBtnFunction,
        modalDisplay,
        setModalDisplay,
        popups,
        setPopups,
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

// Custom hook to use the RestaurantsContext
const useRestaurantsContext = () => {
  return useContext(RestaurantsContext);
};

export {
  RestaurantsContextProvider,
  RestaurantsContext,
  useRestaurantsContext,
};
