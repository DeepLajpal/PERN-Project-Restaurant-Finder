import React, { useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import CustomModal from "./modal";
import UpdateRestaurant from "../components/UpdateRestaurant";
import Loader from "./Loader";

const RestaurantList = () => {
  const {
    restaurants,
    setRestaurants,
    RenderStarRatingComponent,
    handleDeleteBtn,
    handleUpdate,
    modalDisplay,
    searchRestaurants,
    inputValue,
  } = useRestaurantsContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkResult = () =>
    inputValue !== "" && searchRestaurants?.length === 0;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const response = await RestaurantFinder.get("/");
        console.log("API Response:", response.data); // For debugging
        setRestaurants(response.data.data.restaurant); // Set to array
        setLoading(false)
      } catch (error) {
        console.log(error);
        // Optionally, set an error state here
      }
    };
    fetch();
  }, [modalDisplay]);

  const handleOnRowClick = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}`);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr className="table-primary">
              <th scope="col">Restaurant</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Rating</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          { loading? <Loader/>: <tbody className="position-relative">
            {checkResult() && (
              <tr>
                <td className="border border-0 bg-white">
                  <div className="position-absolute start-50 translate-middle-x text-dark">
                    No Result Found
                  </div>
                </td>
              </tr>
            )}

            { console.log("RestaurantsCheckResult: ", !checkResult())}
            {  Array.isArray(restaurants) && !checkResult() &&
              (searchRestaurants?.length > 0
                ? searchRestaurants
                : restaurants
              ).map((restaurant) => {
                return (
                  <tr
                    onClick={(e) => handleOnRowClick(e, restaurant?.id)}
                    key={restaurant?.id}
                  >
                    <td className="align-middle">{restaurant?.name}</td>
                    <td className="align-middle">{restaurant?.location}</td>
                    <td className="align-middle">{restaurant?.price_range}</td>
                    <td className="text-warning align-middle">
                      {RenderStarRatingComponent(restaurant)}
                    </td>
                    <td
                      className="align-middle"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CustomModal
                        value={<UpdateRestaurant restaurant={restaurant} />}
                        modalCloseBtnName="Save"
                        modalCloseBtnFunction={handleUpdate}
                        functionParam={{ restaurant }}
                        modalOpenBtnName="Update"
                        title="Update Restaurant"
                        modalOpenBtnColor="warning"
                      />
                    </td>
                    <td
                      className="align-middle"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CustomModal
                        value="Are you Sure, you want to delete?"
                        modalCloseBtnName="Yes"
                        modalCloseBtnFunction={handleDeleteBtn}
                        functionParam={{ restaurant }}
                        modalOpenBtnName="Delete"
                        title="Confirm deletion"
                        modalOpenBtnColor="danger"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>}
        </table>
      </div>
    </div>
  );
};

export default RestaurantList;
