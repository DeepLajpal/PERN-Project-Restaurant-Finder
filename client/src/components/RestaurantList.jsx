import React, { useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useRestaurantsContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useRestaurantsContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurant[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleDeleteBtn = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`./${id}`);

      // Update the state to remove the deleted restaurant
      setRestaurants(() => {
        return restaurants.filter((restaurant) => restaurant.id !== id);
      });

      console.log("Delete Success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnRowClick = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}`);
  };

  const handleUpdateBtn = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-dark">
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
        <tbody>

          {restaurants && restaurants.map((restaurant) => {
            return (
              <tr
                onClick={(e) => handleOnRowClick(e, restaurant?.id)}
                key={restaurant?.id}
              >
                <td className="align-middle">{restaurant?.name}</td>
                <td className="align-middle">{restaurant?.location}</td>
                <td className="align-middle">
                  {"$".repeat(restaurant?.price_range)}
                </td>
                <td className="align-middle">reviews</td>
                <td className="align-middle">
                  <button
                    onClick={(e) => handleUpdateBtn(e, restaurant?.id)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td className="align-middle">
                  <button
                    onClick={(e) => handleDeleteBtn(e, restaurant?.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
