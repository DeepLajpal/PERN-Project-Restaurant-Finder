import { useState, createContext, useContext } from "react";
import StartRating from "../components/StartRating";
import RestaurantFinder from "../apis/RestaurantFinder";
// import { useNavigate } from "react-router-dom";

const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [currentReviews, setCurrentReviews] = useState({});
  const [popups, setPopups] = useState([]);
  const [modalCloseBtnFunction, setModalCloseBtnFunction] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedPriceRange, setUpdatedPriceRange] = useState("Price Range");
  const [modalDisplay, setModalDisplay] = useState(true);
  const [searchRestaurants, setSearchRestaurants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  

  // const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name && location && priceRange !== "Price Range") {
        const exists = restaurants?.some(
          (restaurant) =>
            restaurant.name === name &&
            restaurant.location === location &&
            restaurant.price_range === priceRange
        );

        if (exists) {
          setModalDisplay(() => true);
          setPopups((prevPopups) => [
            ...prevPopups,
            "Restaurant Already Exist!",
          ]);
          setTimeout(() => {
            setPopups((prevPopups) => prevPopups.slice(1));
          }, 1500);
        } else {
          // All details are valid, and the restaurant doesn't exist
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

          setName("");
          setLocation("");
          setPriceRange("Price Range");
        }
      } else {
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

  const addRestaurant = (restaurant) => {
    setRestaurants((prevRestaurants) => [...prevRestaurants, restaurant]);
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
        setPopups((prevPopups) => [...prevPopups, "Delete Sccess!"]);
        setTimeout(() => {
          setPopups((prevPopups) => prevPopups.slice(1));
        }, 1500);
        setModalDisplay(() => false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setModalDisplay(() => true);
      setPopups((prevPopups) => [...prevPopups, "Reviews Exist!"]);
      setTimeout(() => {
        setPopups((prevPopups) => prevPopups.slice(1));
      }, 1500);
    }
  };

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
            const response = await RestaurantFinder.put(`./${restaurant.id}`, {
              name: updatedName,
              location: updatedLocation,
              price_range: updatedPriceRange,
            });

            try {
              const response = await RestaurantFinder.get("/");
              setRestaurants(response.data.data.restaurant[0]);
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
            setPopups((prevPopups) => [...prevPopups, "Update Succesfully"]);
            setTimeout(() => {
              setPopups((prevPopups) => prevPopups.slice(1));
            }, 1500);

            setUpdatedName("");
            setUpdatedLocation("");
            setUpdatedPriceRange("Price Range");
          } catch (error) {
            console.log(error);
          }
        }
      } else {
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

const useRestaurantsContext = () => {
  return useContext(RestaurantsContext);
};

export {
  RestaurantsContextProvider,
  RestaurantsContext,
  useRestaurantsContext,
};
