import React from "react";
import CustomModal from "./modal";
import AddRestaurant from "./AddRestaurant";
import { useRestaurantsContext } from "../context/RestaurantContext";

const NavBar = () => {
  const { handleOnSubmit, restaurants, setRestaurants, setSearchRestaurants, setInputValue } =
    useRestaurantsContext();

  const SearchResult = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input value to lowercase

    setSearchRestaurants(restaurants);

    setSearchRestaurants(() => {
      if (inputValue !== "") {
        return restaurants?.filter((restaurant) => {
          // Convert restaurant properties to lowercase for case-insensitive comparison
          const nameMatch = restaurant?.name.toLowerCase().includes(inputValue);
          const locationMatch = restaurant?.location
            .toLowerCase()
            .includes(inputValue);
          // const priceRangeMatch = restaurant.pricerange.toLowerCase() === inputValue;

          // Use logical OR to check if any of the properties match the input value
          return nameMatch || locationMatch /* || priceRangeMatch */;
        });
      } else {
        setRestaurants(() => restaurants);
      }
    });
    setInputValue(inputValue);
  };

  return (
    <div className="mb-2">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault(e)}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={SearchResult}
            />
          </form>
          <CustomModal
            value={<AddRestaurant />}
            modalOpenBtnName="Add Restaurant"
            title="Add a Restaurant"
            modalOpenBtnColor="primary"
            modalCloseBtnName="Add"
            modalCloseBtnFunction={handleOnSubmit}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
